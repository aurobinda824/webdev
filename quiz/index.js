const number_of_quizes = 10
var answered_correctly = 0
var i = 0

const header = document.getElementsByClassName('header')

const stat = document.createElement('p')
const score = document.createElement('p')
const button_reset = document.createElement('button')

stat.className = 'stat'
score.className = 'score'

header[0].appendChild(stat)
header[0].appendChild(score)

function update_score_in_html()
{
    stat.innerText = (i + 1).toString() + ' / ' + number_of_quizes.toString();
    score.innerText = 'Correct: ' + answered_correctly.toString()
}

button_reset.innerText = 'reset'
header[0].appendChild(button_reset)
button_reset.onclick = () => reset_quiz()

const apiUrl = 'https://opentdb.com/api.php?amount=10'
var trivia = []
var isCorrect

const questions = document.getElementsByClassName('ques')
const list = document.getElementsByClassName('opts')
const index = document.createElement('p')
const q = document.createElement('p')

index.className = 'index'
q.className = 'q'

questions[0].appendChild(index)
questions[0].appendChild(q)

const footer = document.getElementsByClassName('footer')
const check = document.createElement('button')
const next = document.createElement('button')

check.onclick = () => check_answer(items, opt, i)
check.innerText = 'Check'
check.className = 'check'
next.onclick = () => next_question(index, q, items)
next.innerText = 'Next'
next.className = 'next'

var opt
const items =[]

for (let i = 0; i < 4; i++)
{
    const temp = document.createElement('button')
    temp.onclick = function(){opt = this.value}
    items.push(temp)
}
for (let i = 0; i < 4; i++)
{
    list[0].appendChild(items[i])
}

footer[0].appendChild(check)
footer[0].appendChild(next)

main();

async function main() 
{
    await fetchData();
    trivia = trivia[0]['results']

    update_score_in_html()
    update_question(index, q)
    update_options(items)
}

async function fetchData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    trivia.push(data);
  }  

function update_question(index, q)
{
    index.innerText = (i + 1).toString() + '.'
    q.innerText = trivia[i]['question']
}

function update_options(items)
{
    var options = trivia[i]['incorrect_answers'].concat([trivia[i]['correct_answer']])

    options = shuffleArray(options)

    for (let j = 0; j < 4; j++)
    {
        items[j].className = 'blue-button'
        items[j].value = options[j]
        items[j].innerText = options[j]
    }
}

function shuffleArray(array)
{
    for (var i = array.length - 1; i > 0; i--)
    { 
        var j = Math.floor(Math.random() * (i + 1));
                   
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
       
    return array;
}

function check_answer(items, opt, i)
{
    isCorrect = (opt == trivia[i]['correct_answer'])
    console.log(isCorrect)

    for (let j = 0; j < 4; j++)
    {
        if (items[j].value == trivia[i]['correct_answer'])
        {
            items[j].className = 'green-button'
        }
        else
        {
            if (items[j].value == opt)
            {
                items[j].className = 'red-button'
            }
        }
        items[j].disabled = true
    }
}

function next_question(index, q, items)
{
    i = i + 1;
    for (let j = 0; j < 4; j++)
    {
        items[j].disabled = false
    }
    if (isCorrect)
    {
       answered_correctly += 1   
    }
    if (i < number_of_quizes + 1)
    {
        update_question(index, q)
        update_options(items)
        update_score_in_html()
    }
}

async function reset_quiz(index, q, items)
{
    i = 0
    answered_correctly = 0
    trivia = []
    main()
}