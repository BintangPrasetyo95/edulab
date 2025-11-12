/**
 * Asam Basa Topic - Specific Content
 * This file contains all content related to the Asam Basa topic
 */

const asamBasaContent = {
    id: 'asam-basa',
    title: 'Asam Basa',
    modulPath: './data/MODUL ASAM BASA_merged.pdf',
    videoPath: './assets/videos/VideoModul.mp4',

    // Render module content for Asam Basa
    renderModul() {
        const contentCard = document.getElementById('content-card');
        if (!contentCard) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

        if (isMobile) {
            // Mobile-friendly PDF display
            contentCard.innerHTML = `
                <div class="mobile-pdf-container">
                    <div class="pdf-info">
                        <h3>📄 Modul Asam Basa</h3>
                        <p>Untuk pengalaman terbaik membaca modul, silakan download PDF atau buka di desktop.</p>
                    </div>
                    <div class="pdf-actions">
                        <a href="${this.modulPath}" target="_blank" class="pdf-button view-pdf">
                            👁️ Lihat PDF
                        </a>
                        <a href="${this.modulPath}" download class="pdf-button download-pdf">
                            📥 Download PDF
                        </a>
                    </div>
                    <div class="pdf-fallback">
                        <iframe src="${this.modulPath}" 
                                width="100%" 
                                height="500px" 
                                style="border: none; border-radius: 8px;">
                            <p>Browser Anda tidak mendukung tampilan PDF. 
                               <a href="${this.modulPath}" target="_blank">Klik di sini untuk membuka PDF</a>
                            </p>
                        </iframe>
                    </div>
                </div>
            `;
        } else {
            // Desktop PDF display
            contentCard.innerHTML = `
                <embed src="${this.modulPath}" type="application/pdf" width="100%" height="600px" style="border-radius: 8px;">
            `;
        }
    },

    // Render video content for Asam Basa
    renderVideo() {
        const contentCard = document.getElementById('content-card');
        if (!contentCard) return;

        contentCard.innerHTML = `
            <video controls width="100%" height="400px" style="border-radius: 8px;">
                <source src="${this.videoPath}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    },

    // Initialize Asam Basa content
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const topicId = urlParams.get('topic');

        // Only render if topic parameter is asam-basa or if we're on a page that needs it
        if (topicId === 'asam-basa' || window.location.pathname.includes('modul.html') && topicId === 'asam-basa') {
            this.setupModuleHandlers();
        }
    },

    // Setup event handlers for module/video buttons
    setupModuleHandlers() {
        const modulBtn = document.querySelector('.header-box.modul');
        const videoBtn = document.querySelector('.header-box.video');

        if (modulBtn) {
            modulBtn.addEventListener('click', () => {
                this.renderModul();
                this.updateActiveHeaderBox('modul');
            });
        }

        if (videoBtn) {
            videoBtn.addEventListener('click', () => {
                this.renderVideo();
                this.updateActiveHeaderBox('video');
            });
        }
    },

    // Update active header box styling
    updateActiveHeaderBox(type) {
        const headerBoxes = document.querySelectorAll('.header-box');
        headerBoxes.forEach(box => box.classList.remove('active'));
        document.querySelector(`.header-box.${type}`)?.classList.add('active');
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    asamBasaContent.init();
});
