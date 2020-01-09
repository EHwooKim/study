// split
const capitals = `Prague, Czech Republi
Copenhagen, Denmark
Paris, France
Madrid, Spain
Rome, Italy`

capitals.split('\n').forEach(s => {
    capital = s.split(', ')[0]
    country = s.split(', ')[1]
    console.log(`${capital} is in ${country}`)
})