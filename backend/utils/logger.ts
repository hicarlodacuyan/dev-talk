function info(...params: any) {
  console.log(...params);
}

function error(...params: any) {
  console.error(...params);
}

export default {
  info,
  error
}