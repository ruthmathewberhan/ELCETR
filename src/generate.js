<script src="./html2pdf.bundle.min.js"></script>

document.getElementById('btn_convert').onclick = function(){
    var element = document.getElementById('contentToPrint');

    var opt = {
        filename: 'cv.pdf',
        image: { type: 'jpeg', quality: 0.98},
        html2canvas: { scale: 1},
        jsPDF: {unit: 'in', format: 'letter', orientation: 'landscape'}
    };
    html2pdf(element, opt);
    };