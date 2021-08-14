/**
 * 現在の日付から指定日までの日数を計算する
 * @param {*} a input type="date"の値(指定日)
 * @returns 現在の日付から指定日までの日数
 */

function diff(a) {
// yyyy-mm-dd の形を　yyyy,mm,ddに分割する    
const dl =  a.split("-");

const thisYear = dl[0];
const thisMonth = dl[1];
const thisDay = dl[2];

console.log(thisDay);

// 現在日時を数値に変換
const nowDate = new Date();
const dateNumNow = nowDate.getTime();

// 指定日時を数値に変換
const targetDate = new Date( thisYear, thisMonth-1, thisDay );  // 月の値は 1 を引く必要がある点に注意
const dateNumTarget = targetDate.getTime();

// 引き算して残日数を計算
const diffMSec = dateNumTarget - dateNumNow;
const diffDays = diffMSec / ( 1000 * 60 * 60 * 24 );
const diff = Math.ceil( diffDays ); // 小数点以下を切り上げる

return diff;
}