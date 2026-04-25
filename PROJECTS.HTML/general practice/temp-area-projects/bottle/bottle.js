// ── Three.js Particle Background ──
(function () {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('particle-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
        colors[i * 3]     = 0.55 + Math.random() * 0.45;
        colors[i * 3 + 1] = 0.1  + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.75 + Math.random() * 0.25;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.75 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    (function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0004;
        particles.rotation.x += 0.0002;
        camera.position.x += (mx * 0.4 - camera.position.x) * 0.02;
        camera.position.y += (-my * 0.4 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    })();
})();

// ── 3D Card Tilt ──
document.querySelectorAll('.boxes').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transition = 'box-shadow 0.3s ease';
    });
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -8;
        const rotY = ((x - cx) / cx) * 8;
        box.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        box.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4)`;
    });
    box.addEventListener('mouseleave', () => {
        box.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        box.style.boxShadow = '';
    });
});

// ── Mouse Parallax on girl image ──
const girlImg = document.querySelector('.just-img img');
if (girlImg) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        girlImg.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
    });
}

// ── Text Split Reveal ──
function splitAndAnimate(selector, baseDelay) {
    const el = document.querySelector(selector);
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = '';
    el.style.opacity = '1';
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.animationDelay = `${baseDelay + i * 0.04}s`;
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
    });
}

splitAndAnimate('.box-one-texts h3', 0.7);
splitAndAnimate('.box-one-texts h4', 1.0);
