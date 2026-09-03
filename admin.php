<?php
/**
 * HONTECH AUTO CENTER INC. — Service & Appointment Management Portal
 * Standalone Vanilla PHP Admin Panel
 */

require_once __DIR__ . '/config.php';

// Handle quick status updates via POST
$message_alert = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'update_status') {
        $app_id = trim($_POST['app_id'] ?? '');
        $new_status = trim($_POST['new_status'] ?? '');
        
        $db = get_db_connection();
        if ($db) {
            try {
                $stmt = $db->prepare("UPDATE appointments SET status = :status WHERE id = :id");
                $stmt->execute([':status' => $new_status, ':id' => $app_id]);
                $message_alert = "Status updated to '$new_status' for $app_id.";
            } catch (PDOException $e) {
                $message_alert = "Database update error: " . $e->getMessage();
            }
        } else if (file_exists(BOOKINGS_JSON)) {
            $raw_bookings = file_get_contents(BOOKINGS_JSON);
            $bookings = json_decode($raw_bookings, true) ?: [];
            foreach ($bookings as &$b) {
                if ($b['id'] === $app_id) {
                    $b['status'] = $new_status;
                    break;
                }
            }
            file_put_contents(BOOKINGS_JSON, json_encode($bookings, JSON_PRETTY_PRINT));
            $message_alert = "Status updated to '$new_status' for $app_id (JSON storage).";
        }
    }
}

$appointments = get_all_appointments();
$messages = get_all_messages();

// Compute summary metrics
$total_bookings = count($appointments);
$pending_count = 0;
$confirmed_count = 0;
$total_revenue_estimate = 0;

foreach ($appointments as $app) {
    if (($app['status'] ?? '') === 'Pending Calibration') $pending_count++;
    if (($app['status'] ?? '') === 'Confirmed' || ($app['status'] ?? '') === 'Completed') $confirmed_count++;
    $total_revenue_estimate += floatval($app['total_estimate'] ?? 0);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hontech Auto Center — Service Management Portal</title>
    <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
    <link rel="stylesheet" href="style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        .admin-page {
            background-color: #f1f5f9;
            min-height: 100vh;
            padding-bottom: 60px;
        }
        .admin-header {
            background-color: #111827;
            color: white;
            padding: 20px 0;
            border-bottom: 3px solid #dc2626;
        }
        .admin-header-inner {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .admin-metrics-grid {
            max-width: 1280px;
            margin: 30px auto;
            padding: 0 24px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
        }
        .metric-card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .metric-icon {
            width: 48px;
            height: 48px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fee2e2;
            color: #dc2626;
        }
        .metric-val {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
        }
        .metric-lbl {
            font-size: 13px;
            color: #64748b;
            font-weight: 500;
        }
        .admin-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
        }
        .admin-section-box {
            background: white;
            border-radius: 16px;
            padding: 24px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04);
            margin-bottom: 32px;
        }
        .table-responsive {
            overflow-x: auto;
            margin-top: 16px;
        }
        .admin-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
        }
        .admin-table th {
            background: #f8fafc;
            padding: 12px 16px;
            color: #475569;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
        }
        .admin-table td {
            padding: 14px 16px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 600;
        }
        .status-pending { background: #fef3c7; color: #b45309; }
        .status-confirmed { background: #dcfce7; color: #15803d; }
        .status-completed { background: #e0e7ff; color: #4338ca; }
        .status-cancelled { background: #fee2e2; color: #b91c1c; }
        .service-tag {
            display: inline-block;
            background: #f1f5f9;
            color: #334155;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            margin: 2px;
        }
        .status-select {
            padding: 6px 10px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 13px;
            background: white;
        }
    </style>
</head>
<body class="admin-page">

    <header class="admin-header">
        <div class="admin-header-inner">
            <div style="display:flex;align-items:center;gap:12px;">
                <a href="index.php" class="navbar-logo" style="margin-bottom:0;">
                    <div class="navbar-logo-icon">
                        <i data-lucide="wrench" style="width:18px;height:18px;color:white"></i>
                    </div>
                    <div class="navbar-logo-text">Hon<span>Tech</span></div>
                </a>
                <span style="background:#374151;color:#f3f4f6;font-size:12px;padding:3px 8px;border-radius:4px;font-weight:600;">Dispatcher Portal</span>
            </div>
            <div>
                <a href="index.php" class="btn-secondary" style="padding:8px 16px;font-size:13px;color:white;border-color:#4b5563;">
                    <i data-lucide="arrow-left" style="width:14px;height:14px"></i>
                    Back to Live Website
                </a>
            </div>
        </div>
    </header>

    <?php if ($message_alert): ?>
        <div class="admin-container" style="margin-top:20px;">
            <div style="background:#dcfce7;border:1px solid #86efac;color:#166534;padding:12px 16px;border-radius:8px;font-size:14px;">
                <i data-lucide="check" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;"></i>
                <?php echo htmlspecialchars($message_alert); ?>
            </div>
        </div>
    <?php endif; ?>

    <!-- Summary Metrics -->
    <div class="admin-metrics-grid">
        <div class="metric-card">
            <div class="metric-icon"><i data-lucide="calendar" style="width:24px;height:24px"></i></div>
            <div>
                <div class="metric-val"><?php echo $total_bookings; ?></div>
                <div class="metric-lbl">Total Appointments</div>
            </div>
        </div>
        <div class="metric-card">
            <div class="metric-icon" style="background:#fef3c7;color:#b45309;"><i data-lucide="clock" style="width:24px;height:24px"></i></div>
            <div>
                <div class="metric-val"><?php echo $pending_count; ?></div>
                <div class="metric-lbl">Pending Intake</div>
            </div>
        </div>
        <div class="metric-card">
            <div class="metric-icon" style="background:#dcfce7;color:#16a34a;"><i data-lucide="check-circle" style="width:24px;height:24px"></i></div>
            <div>
                <div class="metric-val"><?php echo $confirmed_count; ?></div>
                <div class="metric-lbl">Confirmed Bookings</div>
            </div>
        </div>
        <div class="metric-card">
            <div class="metric-icon" style="background:#ede9fe;color:#7c3aed;"><i data-lucide="banknote" style="width:24px;height:24px"></i></div>
            <div>
                <div class="metric-val">₱<?php echo number_format($total_revenue_estimate, 2); ?></div>
                <div class="metric-lbl">Pipeline Estimate Value</div>
            </div>
        </div>
    </div>

    <!-- Main Content Area -->
    <div class="admin-container">
        <!-- Appointments Table -->
        <div class="admin-section-box">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                <div>
                    <h3 style="font-size:18px;font-weight:700;color:#0f172a;">Scheduled Service Appointments</h3>
                    <p style="color:#64748b;font-size:13px;">Manage customer repair requests, update triage statuses, and verify bookings.</p>
                </div>
            </div>

            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Ref ID</th>
                            <th>Customer Info</th>
                            <th>Vehicle & Class</th>
                            <th>Schedule Slot</th>
                            <th>Services Checklist</th>
                            <th>Estimate</th>
                            <th>Status Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($appointments)): ?>
                            <tr>
                                <td colspan="7" style="text-align:center;padding:32px;color:#94a3b8;">No bookings received yet. Test the booking tool on the main website!</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($appointments as $item): ?>
                                <?php
                                    $st = $item['status'] ?? 'Pending Calibration';
                                    $badge_class = 'status-pending';
                                    if ($st === 'Confirmed') $badge_class = 'status-confirmed';
                                    else if ($st === 'Completed') $badge_class = 'status-completed';
                                    else if ($st === 'Cancelled') $badge_class = 'status-cancelled';
                                    
                                    $services_list = $item['services'];
                                    if (is_string($services_list)) {
                                        $services_list = json_decode($services_list, true) ?: [$services_list];
                                    }
                                ?>
                                <tr>
                                    <td>
                                        <strong style="color:#dc2626;"><?php echo htmlspecialchars($item['id']); ?></strong><br>
                                        <small style="color:#94a3b8;"><?php echo htmlspecialchars(substr($item['created_at'] ?? '', 0, 10)); ?></small>
                                    </td>
                                    <td>
                                        <strong><?php echo htmlspecialchars($item['customer_name']); ?></strong><br>
                                        <span style="color:#64748b;font-size:12px;"><i data-lucide="phone" style="width:12px;height:12px;display:inline-block;vertical-align:middle;"></i> <?php echo htmlspecialchars($item['phone']); ?></span><br>
                                        <?php if (!empty($item['email'])): ?>
                                            <span style="color:#64748b;font-size:12px;"><i data-lucide="mail" style="width:12px;height:12px;display:inline-block;vertical-align:middle;"></i> <?php echo htmlspecialchars($item['email']); ?></span>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <strong><?php echo htmlspecialchars($item['car_model']); ?></strong><br>
                                        <span style="text-transform:uppercase;font-size:11px;font-weight:700;color:#64748b;"><?php echo htmlspecialchars($item['car_type']); ?></span>
                                    </td>
                                    <td>
                                        <div style="font-weight:600;"><?php echo htmlspecialchars($item['booking_date']); ?></div>
                                        <small style="color:#64748b;"><?php echo htmlspecialchars($item['booking_time']); ?></small>
                                    </td>
                                    <td style="max-width:280px;">
                                        <?php if (is_array($services_list)): ?>
                                            <?php foreach ($services_list as $svc): ?>
                                                <span class="service-tag"><?php echo htmlspecialchars($svc); ?></span>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                        <?php if (!empty($item['notes'])): ?>
                                            <div style="margin-top:4px;font-size:11px;color:#b45309;background:#fef3c7;padding:3px 6px;border-radius:4px;">
                                                <strong>Note:</strong> <?php echo htmlspecialchars($item['notes']); ?>
                                            </div>
                                        <?php endif; ?>
                                    </td>
                                    <td>
                                        <strong style="color:#0f172a;font-size:15px;">₱<?php echo number_format(floatval($item['total_estimate']), 2); ?></strong>
                                    </td>
                                    <td>
                                        <form method="POST" style="display:flex;align-items:center;gap:6px;">
                                            <input type="hidden" name="action" value="update_status">
                                            <input type="hidden" name="app_id" value="<?php echo htmlspecialchars($item['id']); ?>">
                                            <select name="new_status" class="status-select" onchange="this.form.submit()">
                                                <option value="Pending Calibration" <?php echo $st === 'Pending Calibration' ? 'selected' : ''; ?>>Pending</option>
                                                <option value="Confirmed" <?php echo $st === 'Confirmed' ? 'selected' : ''; ?>>Confirmed</option>
                                                <option value="In Progress" <?php echo $st === 'In Progress' ? 'selected' : ''; ?>>In Progress</option>
                                                <option value="Completed" <?php echo $st === 'Completed' ? 'selected' : ''; ?>>Completed</option>
                                                <option value="Cancelled" <?php echo $st === 'Cancelled' ? 'selected' : ''; ?>>Cancelled</option>
                                            </select>
                                        </form>
                                        <span class="status-badge <?php echo $badge_class; ?>" style="margin-top:4px;"><?php echo htmlspecialchars($st); ?></span>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Contact Messages Table -->
        <div class="admin-section-box">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin-bottom:4px;">Customer Inquiry Messages</h3>
            <p style="color:#64748b;font-size:13px;margin-bottom:16px;">Direct messages submitted through the website contact form.</p>

            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Sender</th>
                            <th>Email</th>
                            <th>Inquiry Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($messages)): ?>
                            <tr>
                                <td colspan="4" style="text-align:center;padding:24px;color:#94a3b8;">No contact messages yet.</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($messages as $msg): ?>
                                <tr>
                                    <td style="white-space:nowrap;color:#64748b;font-size:12px;"><?php echo htmlspecialchars(substr($msg['created_at'] ?? date('Y-m-d'), 0, 16)); ?></td>
                                    <td><strong><?php echo htmlspecialchars($msg['name']); ?></strong></td>
                                    <td><a href="mailto:<?php echo htmlspecialchars($msg['email']); ?>" style="color:#dc2626;"><?php echo htmlspecialchars($msg['email']); ?></a></td>
                                    <td><?php echo nl2br(htmlspecialchars($msg['message'])); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
        });
    </script>
</body>
</html>
