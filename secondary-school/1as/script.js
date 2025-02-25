// أسماء المواد مع المعاملات المحددة مسبقًا
const subjects = [
    { name: "رياضيات", coefficient: 5 },
    { name: "فيزياء", coefficient: 4 },
    { name: "علوم طبيعية", coefficient: 4},
    { name: "اعلام الي", coefficient: 2 },
    { name: "عربية", coefficient: 3 },
    { name: "فرنسية", coefficient: 2 },
    { name: "إنجليزية", coefficient: 2 },
    { name: "اجتماعيات", coefficient: 2 },
    { name: "تكنولوجيا", coefficient: 2 },
    { name: "تربية إسلامية", coefficient: 2 },
    { name: "تربية بدنية", coefficient: 1 }
];

// إنشاء الجدول تلقائيًا
const tableBody = document.getElementById("gradesTable");

// تحميل العلامات المحفوظة إن وجدت
let savedData = JSON.parse(localStorage.getItem("gradesData")) || {};

subjects.forEach(subject => {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${subject.name}</td>
        <td><input type="number" min="0" max="20" class="grade" data-subject="${subject.name}" data-type="assignment"></td>
        <td><input type="number" min="0" max="20" class="grade" data-subject="${subject.name}" data-type="assessment"></td>
        <td><input type="number" min="0" max="20" class="grade" data-subject="${subject.name}" data-type="test"></td>
        <td>${subject.coefficient}</td>
        <td class="subjectAverage">--</td>
    `;
    tableBody.appendChild(row);

    // تحميل العلامات المحفوظة إن وجدت
    if (savedData[subject.name]) {
        let inputs = row.querySelectorAll(".grade");
        inputs[0].value = savedData[subject.name].assignment;
        inputs[1].value = savedData[subject.name].assessment;
        inputs[2].value = savedData[subject.name].test;
    }
});

// حفظ العلامات عند الإدخال
document.querySelectorAll(".grade").forEach(input => {
    input.addEventListener("input", function() {
        // Validate and enforce min/max values
        let value = parseFloat(this.value);
        if (value > 20) this.value = 20;
        if (value < 0) this.value = 0;
        // Call saveGrades after validation
        saveGrades();
    });
});

function saveGrades() {
    let data = {};

    document.querySelectorAll("#gradesTable tr").forEach(row => {
        let subject = row.cells[0].innerText;
        let grades = row.querySelectorAll(".grade");

        data[subject] = {
            assignment: grades[0].value || "",
            assessment: grades[1].value || "",
            test: grades[2].value || ""
        };
    });

    localStorage.setItem("gradesData", JSON.stringify(data));
}

// حساب المعدل الفصلي
function calculateAverage() {
    let totalWeightedSum = 0;
    let totalCoefficient = 0;

    document.querySelectorAll("#gradesTable tr").forEach(row => {
        let grades = row.querySelectorAll(".grade");
        let coefficient = parseFloat(row.cells[4].innerText);

        let test = parseFloat(grades[2].value) || 0;
        let assessment = parseFloat(grades[1].value) || 0;
        let assignment = parseFloat(grades[0].value) || 0;

        let subjectAverage = ((assignment + assessment + 2 * test) / 4) * coefficient;
        row.querySelector(".subjectAverage").innerText = subjectAverage.toFixed(2);

        totalWeightedSum += subjectAverage;
        totalCoefficient += coefficient;
    });

    let finalAverage = totalCoefficient > 0 ? (totalWeightedSum / totalCoefficient).toFixed(2) : "--";
    document.getElementById("finalAverage").innerText = "المعدل الفصلي: " + finalAverage;

    saveGrades(); // حفظ العلامات بعد الحساب
}

// تحميل البيانات تلقائيًا عند فتح الصفحة
document.addEventListener("DOMContentLoaded", saveGrades);