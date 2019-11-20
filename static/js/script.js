function cloneQuestion() {

  var question_template = document.getElementsByClassName('question_template')
  question_template = question_template[question_template.length - 1].cloneNode(true)

  var count = question_template.getElementsByClassName('radio')[0].getAttribute('name').match(/\d+/)[0]
  count = parseInt(count) + 1

  var radioArr = Array.from(question_template.getElementsByClassName('radio'))
  radioArr.forEach(elem => elem.setAttribute('name', `correct[${count}]`))

  var form = document.getElementById('form')
  var tray = document.getElementsByClassName('buttons_tray')[0]
  form.insertBefore(question_template, tray)

}

function nextSection() {

  document.getElementById('section_one').style.display = 'none'
  document.getElementById('section_two').style.display = 'inherit'
  document.getElementById('submit').style.display = 'inherit'

  var test_id = document.getElementById('test_id').value;
  console.log(test_id);
  
  $.ajax({
    type: 'GET',
    url: '/loadquestion/' + test_id,
    dataType: 'json',
    success: function (response) {
      let arr = ['one', 'two', 'three', 'four']
      response.forEach(function (quizz, index) {
        $('#table').append(`
            <tr>
              <td span=2> <b>Question:</b> ${ quizz.text } </td>
            </tr>`)
        quizz.answers.forEach(function (answer, index) {
          $('#table').append(`<tr>
            <td>Option ${index}: ${answer }<td><input class='radio' type="radio" name="${quizz._id }" value="${arr[index] }">                
        </tr>
            `)
        })
        $('#table').append('<hr>')
      })

    }
  });

}