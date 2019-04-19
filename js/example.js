var patternArray = [
  [125,75,125,275,200,275,125,75,125,275,200,600,200,600],
  [200,100,200,275,425,100,200,100,200,275,425,100,75,25,75,125,75,25,75,125,100,100]
];

function doVib(pattern_id) {

        var hasVib = "vibrate" in navigator || "mozVibrate" in navigator;

        if (hasVib && !("vibrate" in navigator))
          navigator.vibrate = navigator.mozVibrate;
        else {
          alert("진동기능을 지원하지 않는 환경입니다.");
          return;
        }

        var pattern = patternArray[pattern_id-1];

        pattern.shift(); //두근두근앱에서 제작한 진동일 경우는 배열의 첫번째 아이템을 삭제합니다
        navigator.vibrate(pattern);
}
