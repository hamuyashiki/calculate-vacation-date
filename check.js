/**
 * schedule.html の入力に不都合がないかをチェックする
 * @returns 一つでも不都合な入力がある場合は false を返す(falseの場合submitしない)
 */

function stopSubmit() {

    let a = document.getElementById("deadline");
    let b = document.getElementById("input-rest");

    a = a.value;
    let showDays = diff(a);

    let f = showDays - b.value; // 指定日までの日数と取得日数との差
    let span = f / b.value;  // 計算上の休みの間隔
    span = Math.ceil(span);

    // yyyy-mm-dd の形を　yyyy,mm,ddに分割する    
    const dl = a.split("-");

    const thisYear = dl[0];
    const thisMonth = dl[1];
    const thisDay = dl[2];

    const limitDate = new Date(thisYear, thisMonth - 1, thisDay)
    const limitDay = limitDate.getDay();

    // 休みの間隔が短い場合は　計算はするが計算結果の重複が生じる可能性があるので注意を促す
    if (span < 7) {
        window.alert("取得間隔が短いため計算結果が重複する可能性があります　計算結果を確認して適宜修正してください");
    }
    // １．指定日までの日数よりも取得日数が多い場合は計算できないのでエラーを出す
    let result1 = 0;
    if (f < 0) {
        result1 = 1;
        window.alert("休みが多すぎて計算できません");
    } else { result1 = 0 }

    // ２．checkboxのチェックがすべてつけられている場合はエラーを出す
    let checks = document.getElementsByName("day");
    let count = 0;
    let result2 = 0;
    let dayArray = [];
    for (i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            count += 1;
            dayArray[i] = i; // 例 [0,1,2,3,4,5,6]
        } else {
            dayArray[i] = 9; // 例 [9,9,9,9,9,9]
        }
    }
    if (count === 7) {
        window.alert("全部にチェックを付けないでください");
        result2 = 1;
    } else {
        result2 = 0;
    }

    // ３．曜日の制約(チェック)が多すぎて日付を一つに絞れない場合はエラーを出す
    let g = showDays - b.value / (7 - count) * 7　　// 指定日までの日数-取得日数÷一週間に最大取れる回数*7日
    let result3 = 0;
    if (g < 0) {
        window.alert("曜日の制約が多すぎて計算できません");
        result3 = 1;
    } else {
        result3 = 0;
    }

    // ４．期限日が休みを取りたくない曜日の場合は調整後に期限を越える可能性があるため修正を促す
    let result4 = 0;
    if (dayArray.includes(limitDay)) {
        window.alert("期限日が休みを取りたくない曜日なので期限日を修正してください");
        result4 = 1;
    } else {
        result4 = 0;
    }

    let result = result1 + result2 + result3 + result4;

    if (result > 0) {
        return false;
    }
}