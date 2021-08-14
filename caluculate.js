
let queryString = window.location.search;  // URLからパラメータ部分を取り出す
let queryObject = new Object();
if(queryString){
  queryString = queryString.substring(1);  // パラメータから?を取り除く
  let parameters = queryString.split('&');
  console.log(parameters.length);
// クエリパラメータの内　最初の２つを配列に保存
    for (let i = 0; i < 2; i++) {
        let element = parameters[i].split('=');
        let paramName = decodeURIComponent(element[0]);
        let paramValue = decodeURIComponent(element[1]);

        console.log(paramName);
        console.log(paramValue);

        queryObject[paramName] = paramValue; // パラメータのnameを引数に年月日を保存
    }
   // クエリパラメータのうち休みを取れない曜日情報を配列に保存

   var checkObject = [];
    for(let i= 2; i < parameters.length; i++) {
      let element1 = parameters[i].split('=');
      var checkValue = decodeURIComponent(element1[1]);

      console.log(checkValue);

      checkObject[i-2] = checkValue; // checkboxの情報を配列に保存
    }
}
console.log(checkObject);

let parameter = document.getElementById("display");
console.log(queryObject["deadline"]);

let a = queryObject["deadline"];
console.log(a);

const difference = diff(a); 
console.log(difference);

let span = difference/queryObject["rest"];
console.log(difference/queryObject["rest"]);

// どの曜日が休みを取れないかを配列に保存(値1:取れない)
const dayE = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
let avoidDay = [];
for(i=0; i<dayE.length; i++) {
   if(checkObject.includes(dayE[i])) {
      avoidDay[i] = 1;
   }
   else{avoidDay[i] = 0;}
}
console.log(avoidDay);

/**
 * 本日を基準に　i　番目の休みがが何月何日何曜日かを計算する
*/
// 結果の表示領域を確保
const resultDivided1 = document.getElementById("result-area1");
const resultDivided2 = document.getElementById("result-area2");

// 計算結果である年月日曜日のオブジェクトが入る配列
let resultArray =[];
// 計算結果である年月日曜日のオブジェクト
let resultObject = {
   year: null,
   month: null,
   date: null,
   day: null,
}

// 休みを取る日数でfor文を回す
const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
let numChild = 0;  // 計算結果を表示するため追加した要素数
for (i = 0; i < queryObject["rest"]; i++) {
   const { a, b, c } = changeDay(span, dayNames, i, 0);
 
   // 計算した日が休みを取れない曜日ではないかをチェックして曜日をずらす
   if (avoidDay[indexDayNames] === 1) {　　　　　　　　　　　　　// 計算した日の曜日のインデックスで休みを取れない曜日の配列を検索したら該当した
      const { a, b, c } = changeDay(span, dayNames, i, 1);　　　// 一日後ろにずらす
      txt = b;
      if (avoidDay[c] === 1) {　　　　　　　　　　　　　　　　　　　　// ずらした結果が休みを取れない曜日でないかをチェック
         const { a, b, c } = changeDay(span, dayNames, i, -1);　　 // だめなら一日前にずらす
         txt = b;
         if (avoidDay[c] === 1) {                                    // ずらした結果が休みを取れない曜日でないかをチェック
            const { a, b, c } = changeDay(span, dayNames, i, 2);     // だめなら二日後ろにずらす
            txt = b;
            if (avoidDay[c] === 1) {                                    // ずらした結果が休みを取れない曜日でないかをチェック
               const { a, b, c } = changeDay(span, dayNames, i, -2);　　// だめなら二日前にずらす
               txt = b;
               if (avoidDay[c] === 1) {                                   // ずらした結果が休みを取れない曜日でないかをチェック
                  const { a, b, c } = changeDay(span, dayNames, i, 3);　　// だめなら三日後ろにずらす
                  txt = b;
                  if (avoidDay[c] === 1) {                                 // ずらした結果が休みを取れない曜日でないかをチェック
                     const { a, b, c } = changeDay(span, dayNames, i, -3); // だめなら三日前にずらす
                     txt = b;
                  }
               }
            }
         }
      }
   }

   // ずらした結果が　ひとつ前の休みの結果と同じでないかをチェックし同じな場合は　最も近い後ろの曜日にする
  console.log(`最終${txt}`);

  // 追加する要素の数により表示エリアを分ける
  numChild += 1;
   const paragraph = document.createElement("h2");
   // 最初の14個とそれ以降で表示する列を分ける
   if(numChild<15){ 
   paragraph.innerText = txt;
   resultDivided1.appendChild(paragraph);
   }
   else{
   paragraph.innerText = txt;
   resultDivided2.appendChild(paragraph);
  }  
}


/**
 * 休みの日を計算し、指定の日数ずらす、表示用コメントを作成する
 * @param {number} s 残りの日数÷取得日数（何日おきに休みを取るか）
 * @param {string} d 曜日
 * @param {*} x 何番目の休みか
 * @param {*} k 曜日をずらす数
 * @returns x番目の休みの年月日曜日、休みの日の表示用コメント、計算した日の曜日のインデックス
 */
function changeDay(s, d, x, k) {
   const nowDate = new Date();
   futureDate = new Date(nowDate.getTime() + (s * (x+1) + k) * 24 * 60 * 60 * 1000);   // 計算した当日を休みに含めないため x+1
   txt = (x + 1) + "番目の休みは" + futureDate.getFullYear() + "年" + (futureDate.getMonth() + 1)
   + "月" + futureDate.getDate() + "日(" + d[futureDate.getDay()] + ")";
   
   resultObject.year = futureDate.getFullYear();
   resultObject.month = futureDate.getMonth() + 1;
   resultObject.date = futureDate.getDate();
   resultObject.day = d[futureDate.getDay()];
   resultArray[x] = resultObject;
   // 計算した日の曜日のインデックスを取得する
   for (j=0; j<d.length; j++) {
      if(resultObject.day === d[j]) {
         indexDayNames = j;
      }
   }
   return { a:resultArray[x], b:txt, c:indexDayNames};
}