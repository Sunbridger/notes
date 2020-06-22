let names = ["iPhone X", "iPhone XS"]

let colors = ["黑色", "白色"]

let storages = ["64g", "256g"]

let combine = function (...chunks) {
  let res = []

  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex]
    let isLast = chunkIndex === chunks.length - 1
    chunk.forEach(val=> {
        let cur = prev.concat(val)
        if (isLast) {
            res.push(cur)
        } else {
            helper(chunkIndex + 1, cur)
        }
    });
  }

  helper(0, [])

  return res
}

console.log(combine(names, colors, storages))
