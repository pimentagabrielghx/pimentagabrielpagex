document.getElementById('fileLabel').addEventListener('click', function () {
    document.getElementById('fileInput').click(); // Simula um clique no input de arquivo
});

document.getElementById('fileInput').addEventListener('change', function () {
    const messageDiv = document.getElementById('message');
    const files = this.files;

    if (files.length > 0) {
        messageDiv.textContent = "✅ Imagen(s) selecionada(s) com sucesso!";
        messageDiv.style.opacity = 1; // Exibir mensagem
        setTimeout(() => messageDiv.style.opacity = 0, 2000); // Ocultar após 2 segundos
    }
});

document.getElementById('generateButton').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const messageDiv = document.getElementById('message');
    const files = Array.from(fileInput.files);

    if (files.length === 0) {
        messageDiv.textContent = "❗Por favor, selecione alguma(s) imagen(s).";
        messageDiv.style.opacity = 1; // Exibir mensagem
        setTimeout(() => messageDiv.style.opacity = 0, 2000); // Ocultar após 2 segundos
        return;
    }

    // Embaralhar as imagens
    const shuffledFiles = files.sort(() => Math.random() - 0.5);

    // Criar o PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let imagesLoaded = 0;

    shuffledFiles.forEach(file => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            pdf.addImage(img, 'JPEG', 10, 10, 180, 160);
            imagesLoaded++;

            // Se todas as imagens foram carregadas, salva o PDF
            if (imagesLoaded === shuffledFiles.length) {
                pdf.save('Sua Mãe é minha.pdf'); // Nome do arquivo PDF
            } else {
                pdf.addPage();
            }
        };
    });
});
