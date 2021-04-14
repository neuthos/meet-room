function as() {
  let temp = 3 * 1000;
  let a = true;

  console.log(a);

  setTimeout(() => {
    a = false;
    console.log(a);
  }, temp);
  return;
}

as();
