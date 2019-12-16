function isPalindrome(str) {
  str = '' + str;
  return (
    Array.from(str)
      .reverse()
      .join('') === str
  );
}

console.log(isPalindrome('strts'));
