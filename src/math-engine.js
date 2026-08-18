// Pahlawan Matematik - pure arithmetic engine
// No user HTML, uploads, credentials or remote code are accepted here.

const LEVELS = Object.freeze({ EASY: 'mudah', MEDIUM: 'sederhana', PRO: 'pro' });
const OPS = Object.freeze({ ADD: 'tambah', SUB: 'tolak', MUL: 'darab', DIV: 'bahagi' });

function int(min, max, rng = Math.random) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function generateQuestion(operation, level, rng = Math.random) {
  if (!Object.values(OPS).includes(operation) || !Object.values(LEVELS).includes(level)) throw new Error('Pilihan latihan tidak sah');
  let a, b, quotient, remainder;
  if (operation === OPS.ADD || operation === OPS.SUB) {
    const ranges = level === LEVELS.EASY ? [1,9] : level === LEVELS.MEDIUM ? [10,99] : [100,999];
    a=int(...ranges,rng); b=int(...ranges,rng);
    if (operation === OPS.SUB && b>a) [a,b]=[b,a];
    return {operation,level,a,b,answer: operation===OPS.ADD?a+b:a-b};
  }
  if (operation === OPS.MUL) {
    if(level===LEVELS.EASY){a=int(1,9,rng);b=int(1,9,rng);} else if(level===LEVELS.MEDIUM){a=int(10,99,rng);b=int(2,9,rng);} else {a=int(10,99,rng);b=int(10,99,rng);}
    return {operation,level,a,b,answer:a*b};
  }
  // Division: construct dividend from quotient/remainder so answer is always internally consistent.
  b = level===LEVELS.EASY ? int(2,9,rng) : level===LEVELS.MEDIUM ? int(2,12,rng) : int(2,25,rng);
  quotient = level===LEVELS.EASY ? int(1,9,rng) : level===LEVELS.MEDIUM ? int(10,99,rng) : int(10,199,rng);
  remainder = level===LEVELS.PRO ? int(0,b-1,rng) : 0;
  a = b*quotient+remainder;
  return {operation,level,a,b,answer:{quotient,remainder}};
}

function safeInteger(value) {
  if (typeof value === 'number') return Number.isSafeInteger(value) ? value : null;
  if (typeof value !== 'string' || !/^-?\d{1,12}$/.test(value.trim())) return null;
  const n=Number(value); return Number.isSafeInteger(n)?n:null;
}

export function checkAnswer(question, submitted) {
  if (!question || typeof question !== 'object') return {correct:false,error:'Soalan tidak sah'};
  if(question.operation===OPS.DIV){
    const q=safeInteger(submitted?.quotient); const r=safeInteger(submitted?.remainder ?? 0);
    if(q===null||r===null) return {correct:false,error:'Jawapan mesti nombor bulat'};
    const correct=q===question.answer.quotient && r===question.answer.remainder;
    return {correct, expected:question.answer};
  }
  const n=safeInteger(submitted);
  if(n===null) return {correct:false,error:'Jawapan mesti nombor bulat'};
  return {correct:n===question.answer,expected:question.answer};
}

export { LEVELS, OPS };
