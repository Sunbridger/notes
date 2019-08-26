let studentss = {
    amelia: 20,
    beatrice: 22,
    cece: 20,
    deirdre: 19,
    eloise: 21
}
  
Object.entries(studentss).filter(([name, age]) => {
    console.log(name, age)
})

console.log(Object.entries(studentss))
  

/**
 * 
[
  [ 'amelia', 20 ],
  [ 'beatrice', 22 ],
  [ 'cece', 20 ],
  [ 'deirdre', 19 ],
  [ 'eloise', 21 ]
]
 */


let students = {
    amelia: 20,
    beatrice: 22,
    cece: 20,
    deirdre: 19,
    eloise: 21
  }
  
  // convert to array in order to make use of .filter() function
  let overTwentyOne = Object.entries(students).filter(([name, age]) => {
    return age >= 21
  }) // [ [ 'beatrice', 22 ], [ 'eloise', 21 ] ]
  
  // turn multidimensional array back into an object
  let DrinkingAgeStudents = Object.fromEntries(overTwentyOne);
  // { beatrice: 22, eloise: 21 }

  console.log(DrinkingAgeStudents)