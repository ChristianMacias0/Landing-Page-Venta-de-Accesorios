const imagenes = {
    collares: [
        "resources/collares/collares1.png",
        "resources/collares/collares2.png",
        "resources/collares/collares3.png",
        "resources/collares/collares4.png",
        "resources/collares/collares5.png",
        "resources/collares/collares6.png",
        "resources/collares/collares7.png"
    ],
    pulseras: [
        "resources/pulseras/pulseras1.png",
        "resources/pulseras/pulseras2.png",
        "resources/pulseras/pulseras3.png"
    ],
    anillos: [
        "resources/anillos/anillos1.png",
        "resources/anillos/anillos2.png"
    ],
    relicarios: [
        "resources/relicarios/relicarios1.png",
        "resources/relicarios/relicarios2.png",
        "resources/relicarios/relicarios3.png",
        "resources/relicarios/relicarios4.png",
        "resources/relicarios/relicarios5.png" 
    ]
};

function renderImagenes(categoria, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    imagenes[categoria].forEach(src => {
        const div = document.createElement('div');
        div.className = "bg-gray-100 rounded-lg overflow-hidden";
        div.innerHTML = `
            <img src="${src}" alt="${categoria}" class="w-full h-64 object-cover transition-opacity hover:opacity-75">
        `;
        contenedor.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderImagenes('collares', 'collares');
    renderImagenes('pulseras', 'pulseras');
    renderImagenes('anillos', 'anillos');
    renderImagenes('relicarios', 'relicarios');
});

// Scroll suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1 && document.querySelector(targetId)) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});