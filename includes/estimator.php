    <!-- ═══════════════════════════════════════
         INTERACTIVE ESTIMATOR & BOOKING TOOL
         ═══════════════════════════════════════ -->
    <section class="section section-alt" id="estimator">
        <div class="container">
            <div style="text-align:center; margin-bottom:48px;" class="reveal">
                <div class="section-label" style="justify-content:center;">Interactive Diagnostic Dashboard</div>
                <h2 class="section-title" style="margin:0 auto 8px;">Custom Estimate & Booking Tool</h2>
                <p class="section-subtitle" style="margin:0 auto;">
                    Select your vehicle body type, pick the preventive maintenance services you need, view real-time price totals based on official guidelines, and book instant priority scheduling.
                </p>
            </div>

            <div class="estimator-layout">
                <!-- Left: Interactive Service Selector -->
                <div class="estimator-selector reveal-left">
                    
                    <!-- Step 1: Vehicle Category & Model -->
                    <div class="estimator-step-block">
                        <div class="step-header">
                            <div class="step-number">1</div>
                            <div>
                                <h3>Select Vehicle Class & Model</h3>
                                <p>Different body sizes require adjusted fluid volume and labor scaling.</p>
                            </div>
                        </div>

                        <div class="car-types-grid" id="carTypesGrid">
                            <button type="button" class="car-type-btn active" data-type="sedan" data-multiplier="1.0">
                                <i data-lucide="car" style="width:20px;height:20px"></i>
                                <span class="car-name">Sedan / Hatchback</span>
                                <span class="car-mult">Standard (1.0x)</span>
                            </button>
                            <button type="button" class="car-type-btn" data-type="suv" data-multiplier="1.25">
                                <i data-lucide="shield" style="width:20px;height:20px"></i>
                                <span class="car-name">SUV / Crossover</span>
                                <span class="car-mult">+25% Scaling</span>
                            </button>
                            <button type="button" class="car-type-btn" data-type="pickup" data-multiplier="1.35">
                                <i data-lucide="truck" style="width:20px;height:20px"></i>
                                <span class="car-name">Pickup Truck</span>
                                <span class="car-mult">+35% Scaling</span>
                            </button>
                            <button type="button" class="car-type-btn" data-type="mpv" data-multiplier="1.30">
                                <i data-lucide="bus" style="width:20px;height:20px"></i>
                                <span class="car-name">MPV / Van</span>
                                <span class="car-mult">+30% Scaling</span>
                            </button>
                        </div>

                        <div class="form-group" style="margin-top:16px;">
                            <label for="car-model-input">Specific Car Make & Model / Year</label>
                            <input type="text" id="car-model-input" class="estimator-input" placeholder="e.g., Honda Civic 2019 / Toyota Fortuner 2022" required>
                        </div>
                    </div>

                    <!-- Step 2: Service Checklist Selector -->
                    <div class="estimator-step-block">
                        <div class="step-header">
                            <div class="step-number">2</div>
                            <div>
                                <h3>Select Services Needed</h3>
                                <p>Click items to add or remove them from your instant estimate calculation.</p>
                            </div>
                        </div>

                        <!-- Category Filter Tabs for Checklist -->
                        <div class="est-cat-tabs">
                            <button type="button" class="est-cat-btn active" data-filter="all">All Services (<span id="totalServicesCount">21</span>)</button>
                            <button type="button" class="est-cat-btn" data-filter="pms">PMS Major (8)</button>
                            <button type="button" class="est-cat-btn" data-filter="basic">Basic (4)</button>
                            <button type="button" class="est-cat-btn" data-filter="added">Added (9)</button>
                        </div>

                        <div class="services-checklist-grid" id="servicesChecklist">
                            <!-- PMS Major -->
                            <div class="service-check-card" data-id="pms-brakes" data-cat="pms" data-price="850">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Clean/Check Brake Systems</div>
                                    <div class="check-desc">Brake shoe/pad cleaning & caliper pins lubrication</div>
                                </div>
                                <div class="check-price">₱850</div>
                            </div>

                            <div class="service-check-card" data-id="pms-tires" data-cat="pms" data-price="450">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Check/Rotate Tires</div>
                                    <div class="check-desc">Tire tread wear inspection & wheel balancing check</div>
                                </div>
                                <div class="check-price">₱450</div>
                            </div>

                            <div class="service-check-card" data-id="pms-lights" data-cat="pms" data-price="150">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Check All Light Bulbs Operations</div>
                                    <div class="check-desc">Full signal and illumination night safety check</div>
                                </div>
                                <div class="check-price">₱150</div>
                            </div>

                            <div class="service-check-card" data-id="pms-air" data-cat="pms" data-price="200">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Check Air Intake System</div>
                                    <div class="check-desc">Airflow duct inspection for horsepower & fuel economy</div>
                                </div>
                                <div class="check-price">₱200</div>
                            </div>

                            <div class="service-check-card" data-id="pms-ac" data-cat="pms" data-price="500">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Check A/C System & Cabin Filter</div>
                                    <div class="check-desc">Refrigerant check and cabin filtration inspection</div>
                                </div>
                                <div class="check-price">₱500</div>
                            </div>

                            <div class="service-check-card" data-id="pms-coolant" data-cat="pms" data-price="300">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Check Coolant & Radiator</div>
                                    <div class="check-desc">Radiator pressure test and coolant condition check</div>
                                </div>
                                <div class="check-price">₱300</div>
                            </div>

                            <div class="service-check-card" data-id="pms-belt" data-cat="pms" data-price="250">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Check Drive Belt Tension</div>
                                    <div class="check-desc">Serpentine and alternator belt condition inspection</div>
                                </div>
                                <div class="check-price">₱250</div>
                            </div>

                            <div class="service-check-card" data-id="pms-spark" data-cat="pms" data-price="400">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Check Spark Plugs Condition</div>
                                    <div class="check-desc">Ignition plug cleaning and gap calibration</div>
                                </div>
                                <div class="check-price">₱400</div>
                            </div>

                            <!-- Basic Maintenance -->
                            <div class="service-check-card selected" data-id="basic-oil" data-cat="basic" data-price="2400">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Change Engine Oil (Synthetic)</div>
                                    <div class="check-desc">Premium oil replacement matching OEM specifications</div>
                                </div>
                                <div class="check-price">₱2,400</div>
                            </div>

                            <div class="service-check-card selected" data-id="basic-oilfilter" data-cat="basic" data-price="450">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Change Oil Filter</div>
                                    <div class="check-desc">OEM filtration element replacement</div>
                                </div>
                                <div class="check-price">₱450</div>
                            </div>

                            <div class="service-check-card" data-id="basic-airfilter" data-cat="basic" data-price="650">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Change Engine Air Filter</div>
                                    <div class="check-desc">Clean intake airflow element for smooth combustion</div>
                                </div>
                                <div class="check-price">₱650</div>
                            </div>

                            <div class="service-check-card selected" data-id="basic-labor" data-cat="basic" data-price="950">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Standard Labor & Calibration</div>
                                    <div class="check-desc">Certified casa-grade mechanical labor and torque specs</div>
                                </div>
                                <div class="check-price">₱950</div>
                            </div>

                            <!-- Added & Specialty -->
                            <div class="service-check-card" data-id="add-carwash" data-cat="added" data-price="180">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Car Wash & Interior Vacuum</div>
                                    <div class="check-desc">Foam wash, tire shine, and cabin clean</div>
                                </div>
                                <div class="check-price">₱180</div>
                            </div>

                            <div class="service-check-card" data-id="add-enginewash" data-cat="added" data-price="450">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Engine Bay Wash</div>
                                    <div class="check-desc">High pressure grease & debris bay cleaning</div>
                                </div>
                                <div class="check-price">₱450</div>
                            </div>

                            <div class="service-check-card" data-id="add-paint" data-cat="added" data-price="3500">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Body and Paint (per panel)</div>
                                    <div class="check-desc">Oven-baked painting & scuff restoration</div>
                                </div>
                                <div class="check-price">₱3,500</div>
                            </div>

                            <div class="service-check-card" data-id="add-home" data-cat="added" data-price="1200">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Home Service / Pick-up</div>
                                    <div class="check-desc">Technician dispatch or vehicle collection in Marikina</div>
                                </div>
                                <div class="check-price">₱1,200</div>
                            </div>

                            <div class="service-check-card" data-id="add-detail" data-cat="added" data-price="3200">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Car Detailing & Wax</div>
                                    <div class="check-desc">Paint correction, claying, and high-gloss wax</div>
                                </div>
                                <div class="check-price">₱3,200</div>
                            </div>

                            <div class="service-check-card" data-id="add-undercoat" data-cat="added" data-price="4500">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Chassis Undercoating</div>
                                    <div class="check-desc">Heavy-duty rust protection seal for Philippine weather</div>
                                </div>
                                <div class="check-price">₱4,500</div>
                            </div>

                            <div class="service-check-card" data-id="add-roadside" data-cat="added" data-price="1500">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">24/7 Roadside Assistance</div>
                                    <div class="check-desc">Emergency towing and troubleshooting support</div>
                                </div>
                                <div class="check-price">₱1,500</div>
                            </div>

                            <div class="service-check-card" data-id="add-parts" data-cat="added" data-price="1000">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">OEM Parts & Consumables</div>
                                    <div class="check-desc">Certified authentic factory components</div>
                                </div>
                                <div class="check-price">₱1,000</div>
                            </div>

                            <div class="service-check-card" data-id="add-record" data-cat="added" data-price="0">
                                <div class="check-box"><i data-lucide="check" style="width:14px;height:14px"></i></div>
                                <div class="check-info">
                                    <div class="check-title">Certificate & Maintenance Log</div>
                                    <div class="check-desc">Official stamped vehicle record tracking</div>
                                </div>
                                <div class="check-price" style="color:#10b981;font-weight:700;">FREE</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Summary & Instant Booking Form -->
                <div class="estimator-summary-panel reveal-right">
                    <div class="summary-card">
                        <div class="summary-header">
                            <h3><i data-lucide="receipt" style="width:20px;height:20px;color:#ef4444;vertical-align:middle;margin-right:8px;"></i>Live Estimate Summary</h3>
                            <span class="summary-badge" id="selectedItemsBadge">3 items selected</span>
                        </div>

                        <!-- Selected Items List -->
                        <div class="selected-items-list" id="selectedItemsList">
                            <!-- Populated dynamically by JS -->
                        </div>

                        <!-- Pricing Breakdown -->
                        <div class="pricing-breakdown">
                            <div class="price-row">
                                <span>Base Services Subtotal</span>
                                <span id="baseSubtotalText">₱3,800.00</span>
                            </div>
                            <div class="price-row">
                                <span>Vehicle Size Scaling (<span id="scalingPercentText">1.0x</span>)</span>
                                <span id="scalingAmountText">₱0.00</span>
                            </div>
                            <div class="price-row total-row">
                                <span>Total Estimated Cost</span>
                                <span class="highlight-total" id="grandTotalText">₱3,800.00</span>
                            </div>
                        </div>

                        <!-- Booking Submission Form -->
                        <form id="bookingForm" class="booking-form" onsubmit="return false;">
                            <h4>Book Instant Priority Service</h4>
                            
                            <div class="form-group">
                                <label for="cust-name">Full Name *</label>
                                <input type="text" id="cust-name" class="estimator-input" placeholder="e.g. Juan Dela Cruz" required>
                            </div>

                            <div class="form-row-2">
                                <div class="form-group">
                                    <label for="cust-phone">Mobile Number *</label>
                                    <input type="tel" id="cust-phone" class="estimator-input" placeholder="0917-123-4567" required>
                                </div>
                                <div class="form-group">
                                    <label for="cust-email">Email Address</label>
                                    <input type="email" id="cust-email" class="estimator-input" placeholder="juan@example.com">
                                </div>
                            </div>

                            <div class="form-row-2">
                                <div class="form-group">
                                    <label for="cust-date">Preferred Date *</label>
                                    <input type="date" id="cust-date" class="estimator-input" required>
                                </div>
                                <div class="form-group">
                                    <label for="cust-time">Preferred Time Slot *</label>
                                    <select id="cust-time" class="estimator-input" required>
                                        <option value="08:00 AM">08:00 AM - Morning Slot</option>
                                        <option value="10:00 AM">10:00 AM - Morning Slot</option>
                                        <option value="01:00 PM">01:00 PM - Afternoon Slot</option>
                                        <option value="03:00 PM">03:00 PM - Afternoon Slot</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="cust-notes">Special Concerns / Symptoms (Optional)</label>
                                <textarea id="cust-notes" class="estimator-input" rows="2" placeholder="e.g., Squeaking sound on front left brake when stopping..."></textarea>
                            </div>

                            <button type="submit" id="btnSubmitBooking" class="btn-primary" style="width:100%;justify-content:center;font-size:16px;padding:14px;">
                                <i data-lucide="calendar-check" style="width:18px;height:18px"></i>
                                Confirm & Book Appointment
                            </button>
                            <p class="form-disclaimer">
                                <i data-lucide="shield-check" style="width:14px;height:14px;color:#10b981;vertical-align:middle;"></i>
                                No upfront payment required. Warranty guaranteed on parts & labor.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
