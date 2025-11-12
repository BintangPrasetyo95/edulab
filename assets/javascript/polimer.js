/**
 * Polimer Topic - Specific Content
 * This file contains all content related to the Polimer topic
 */

const polomerContent = {
    id: 'polimer',
    title: 'Polimer',
    modulPath: './data/MODUL POLIMER.pdf',
    videoPath: './assets/videos/VideoPolimer.mp4',

    renderModul() {
        const contentCard = document.getElementById('content-card');
        if (!contentCard) return;

        contentCard.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p>Modul untuk topik Polimer sedang dalam pengembangan. Silakan coba topik lain.</p>
            </div>
        `;
    },

    renderVideo() {
        const contentCard = document.getElementById('content-card');
        if (!contentCard) return;

        contentCard.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p>Video tutorial untuk topik Polimer sedang dalam pengembangan. Silakan coba topik lain.</p>
            </div>
        `;
    },

    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const topicId = urlParams.get('topic');

        if (topicId === 'polimer') {
            this.setupModuleHandlers();
        }
    },

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

    updateActiveHeaderBox(type) {
        const headerBoxes = document.querySelectorAll('.header-box');
        headerBoxes.forEach(box => box.classList.remove('active'));
        document.querySelector(`.header-box.${type}`)?.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    polomerContent.init();
});
