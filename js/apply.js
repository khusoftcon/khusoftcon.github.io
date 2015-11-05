function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  return re.test(email);
}

function onSubmit() {
  if ( !validateEmail($("#email").val())){
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  var inputs = document.getElementsByTagName('input');
  for ( index = 0; index < inputs.length; index++) {
    if (inputs[index].value == null || inputs[index].value == '') {
        alert('비어있는 항목이 있습니다. 모두 채워주세요.');
        return false;
    }
  }
  var wants = '['

  $(":checkbox").each(function () {
    var ischecked = $(this).is(":checked");
    if (ischecked) {
      wants += $(this).val() + ",";
    }
  });
  wants += "]";
  var data={
    name: $("#name").val(),
    email: $("#email").val(),
    school: $("#school").val(),
    grade: $('input[name=grade]:checked').val(),
    wantstr: wants
  }

  $.ajax
  ({
    type: 'POST',
    url: 'http://61.255.4.211:5003',
    async: false,
    data: data,
    success: function(result){
      code = "<div class='text-center'><h3> 참가신청이 완료되었습니다!! </h3><br/>"
      code += "<h4> 행사 당일 이름, 학교, 이메일을 제시하여 참가확인을 해주세요.</h4>"
      code += "<h4> <a href='https://www.facebook.com/khusoftcon'>경희대학교 SoftCon 페이스북</a>을 통해 소식을 좀 더 빠르게 접해보세요!</h4>"
      code += "<img class='khukhu' src='/img/khukhu.png'/></div>"
      $('#registerform').html(code);
      $("html, body").animate({ scrollTop: 0 }, "slow");
    },
    statusCode:{
      406:function(){
        alert("이미 등록된 이메일 주소입니다.");
      }
    }
  });
}

function registerCheck() {

  if ( !validateEmail($("#email").val())){
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }

  var data={
    email: $("#email").val()
  }

  $.ajax
  ({
    type: 'POST',
    url: 'http://61.255.4.211:5003/check',
    async: false,
    data: data,
    success: function(result){
      code = "<div class='text-center'><h3> 11월 13일 참가신청 결과를 보내드리겠습니다!!</h3>"
      code += "<h4> 참가자로 선정되시면 메일을 받으실 수 있습니다 :^)</h4>"
      code += "<h4> <a href='https://www.facebook.com/khusoftcon'>경희대학교 SoftCon 페이스북</a>을 통해 소식을 좀 더 빠르게 접해보세요!</h4></div><br/>"
      code += "<ul class='list-group'>"
      code += "<li class='list-group-item'>이름 : "+result.name+"</li>"
      code += "<li class='list-group-item'>학교 : "+result.school+"</li>"
      code += "<li class='list-group-item'>이메일 : "+result.email+"</li>"
      code += "<li class='list-group-item'>학년 : "+result.grade+"학년</li>"
      code += "</ul>"
      $('#registerform').html(code);
      $("html, body").animate({ scrollTop: 0 }, "slow");
    },
    statusCode:{
      406:function(){
        code = "<div class='text-center'><h3> 참가 신청자 명단에 없습니다!! </h3><br/>"
        code += "<h4> 얼른 등록해주세요~ </h4>"
        code += "<img class='khukhu' src='/img/khukhu.png'/></div>"
        $('#registerform').html(code);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
    }
  });
}
