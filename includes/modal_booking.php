    <!-- ═══════════════════════════════════════
         BOOKING CONFIRMATION MODAL
         ═══════════════════════════════════════ -->
    <div class="modal-backdrop" id="bookingModalBackdrop">
        <div class="modal-card">
            <div class="modal-icon-success">
                <i data-lucide="check-circle" style="width:36px;height:36px;color:#10b981"></i>
            </div>
            <h3>Appointment Scheduled!</h3>
            <p class="modal-subtitle">Your service slot has been reserved in our priority queue.</p>
            
            <div class="booking-receipt-box">
                <div class="receipt-row">
                    <span>Reference ID:</span>
                    <strong id="receiptId" class="receipt-id-tag">HACI-XXXXXX</strong>
                </div>
                <div class="receipt-row">
                    <span>Customer:</span>
                    <strong id="receiptName">-</strong>
                </div>
                <div class="receipt-row">
                    <span>Vehicle:</span>
                    <strong id="receiptVehicle">-</strong>
                </div>
                <div class="receipt-row">
                    <span>Date & Time:</span>
                    <strong id="receiptDateTime">-</strong>
                </div>
                <div class="receipt-row">
                    <span>Selected Services:</span>
                    <span id="receiptServicesCount">0 services</span>
                </div>
                <div class="receipt-row total">
                    <span>Estimated Total:</span>
                    <strong id="receiptTotal" style="color:#dc2626;font-size:18px;">₱0.00</strong>
                </div>
            </div>

            <p class="modal-note">
                <i data-lucide="info" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"></i>
                Our dispatch supervisors will contact your mobile number for preliminary intake confirmation.
            </p>

            <div class="modal-actions">
                <button type="button" class="btn-primary" id="btnCloseModal" style="width:100%;justify-content:center;">
                    Done & Close
                </button>
            </div>
        </div>
    </div>

    <!-- Toast Notification Container -->
    <div class="toast-container" id="toastContainer"></div>
