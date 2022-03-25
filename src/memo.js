export function memoize(fn) {
  let cache = {}
  function resolve(...args) {
    let key = checkObj(...args)
    if (key in cache) {
      return cache[key]
    } else {
      let result = fn(...args)
      cache[key] = result
      return result
    }
  }
  return resolve
}

export function cache(fn) {
  let cache = {}
  function resolve(value) {
    let key = checkObj(value)
    if (key in cache) {
      cache[key].hitCount++
      return cache[key].result
    } else {
      let result = fn(value)
      cache[key] = { result: result, hitCount: 0 }
      return result
    }
  }

  function hitCount(key) {
    if (key in cache) {
      return cache[key].hitCount
    } else {
      return 0
    }
  }

  function clearCache() {
    cache = {}
  }

  return {
    fn: resolve, hitCount,
    clear: clearCache
  }
}

function checkObj(...obj) {
  const v = typeof obj[0] === 'object' && obj[0] !== null;
  if (v) {
    return obj[0].hasOwnProperty('orderId') ? obj[0].orderId : obj
  }else if(obj.length > 1){
    return obj.reduce(function (pre, cur) {
      return pre + cur
    });
  }
  return obj
}