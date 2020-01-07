function callRoll(students) {
    if (!Array.isArray(students)) return

    students.forEach((student) => {
        console.log(`Are tou here, ${student}`)
    })
}
const students = ['kim', 'lee', 'hong', 'park']
callRoll(students)