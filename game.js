// Game engine
let currentStory = storyData.caveSleepers;
let currentNode = 'start';

function renderNode(nodeId) {
    const node = currentStory[nodeId];
    const storyText = document.getElementById('story-text');
    const choicesDiv = document.getElementById('choices');
    
    // Clear previous content
    choicesDiv.innerHTML = '';
    
    // Display story text
    storyText.textContent = node.text;
    
    // Check if this is an ending (has lesson)
    if (node.lesson) {
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'lesson';
        lessonDiv.innerHTML = `
            <h3>${node.lesson.title}</h3>
            <p>${node.lesson.text}</p>
        `;
        choicesDiv.appendChild(lessonDiv);
        
        // Add restart button
        const restartBtn = document.createElement('button');
        restartBtn.className = 'restart-btn';
        restartBtn.textContent = 'Begin Again';
        restartBtn.onclick = () => {
            currentNode = 'start';
            renderNode(currentNode);
        };
        choicesDiv.appendChild(restartBtn);
    } else {
        // Display choices
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.onclick = () => {
                currentNode = choice.next;
                renderNode(currentNode);
            };
            choicesDiv.appendChild(btn);
        });
    }
}

// Initialize game
renderNode(currentNode);