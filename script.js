let currentLevel = '';

function selectLevel(level) {
    currentLevel = level;
    const calculator = document.getElementById('calculator');
    const titleElement = document.getElementById('selected-level-title');
    const gradeSelect = document.getElementById('grade-select');
    
    calculator.style.display = 'block';
    
    const titles = {
        'elementary': 'المرحلة الابتدائية',
        'middle': 'المرحلة المتوسطة',
        'highschool': 'المرحلة الثانوية'
    };
    
    titleElement.textContent = titles[level];
    
    // Show only relevant grade options
    Array.from(gradeSelect.options).forEach(option => {
        if (option.value === '' || option.dataset.level === level) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
    
    // Reset selections
    gradeSelect.value = '';
    document.getElementById('stream-selection').style.display = 'none';
    document.getElementById('stream-select').value = '';
    
    calculator.scrollIntoView({ behavior: 'smooth' });
    
    // Reset continue button
    document.getElementById('continue-btn').disabled = true;
}

function handleGradeChange() {
    const gradeSelect = document.getElementById('grade-select');
    const streamSelection = document.getElementById('stream-selection');
    const streamSelect = document.getElementById('stream-select');
    const continueBtn = document.getElementById('continue-btn');
    
    if (gradeSelect.value) {
        const selectedOption = gradeSelect.options[gradeSelect.selectedIndex];
        const href = selectedOption.dataset.href;
        
        if (currentLevel === 'highschool') {
            const streamOptions = streamSelect.options;
            if (gradeSelect.value === 'السنة الأولى') {
                Array.from(streamOptions).forEach(option => {
                    if (option.value === '' || option.dataset.year === 'first') {
                        option.style.display = '';
                    } else {
                        option.style.display = 'none';
                    }
                });
                streamSelection.style.display = 'block';
                continueBtn.disabled = true; // Disable until stream is selected
            } else if (gradeSelect.value === 'السنة الثانية') {
                Array.from(streamOptions).forEach(option => {
                    if (option.value === '' || option.dataset.year === 'second') {
                        option.style.display = '';
                    } else {
                        option.style.display = 'none';
                    }
                });
                streamSelection.style.display = 'block';
                continueBtn.disabled = true; // Disable until stream is selected
            } else if (gradeSelect.value === 'السنة الثالثة') {
                Array.from(streamOptions).forEach(option => {
                    if (option.value === '' || option.dataset.year === 'third') {
                        option.style.display = '';
                    } else {
                        option.style.display = 'none';
                    }
                });
                streamSelection.style.display = 'block';
                continueBtn.disabled = true; // Disable until stream is selected
            } else {
                streamSelection.style.display = 'none';
            }
        } else {
            streamSelection.style.display = 'none';
            continueBtn.disabled = false; // Enable for non-highschool levels
            continueBtn.onclick = () => {
                if (href) {
                    window.location.href = href;
                }
            };
        }
    } else {
        continueBtn.disabled = true;
    }
}

function handleStreamChange() {
    const streamSelect = document.getElementById('stream-select');
    const continueBtn = document.getElementById('continue-btn');
    
    if (streamSelect.value) {
        const selectedOption = streamSelect.options[streamSelect.selectedIndex];
        const href = selectedOption.dataset.href;
        continueBtn.disabled = false;
        continueBtn.onclick = () => {
            if (href) {
                window.location.href = href;
            }
        };
    } else {
        continueBtn.disabled = true;
    }
}

function goBack() {
    const calculator = document.getElementById('calculator');
    calculator.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('continue-btn').disabled = true;
}