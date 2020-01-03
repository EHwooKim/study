let family = {
    'address': 'Seoul',
    members: {},
    addFamily: function(age, name, role) {
        this.members[role] = {
            age: age,
            name: name
        }
    },
    getHeadcount: function() {
        return Object.keys(this.members).length
    }
}

family.addFamily(29, '김태우', '아들')
family.addFamily(29, '김인성', '딸')
family.addFamily(27, '홍순범', '반려동물')

let printMembers = function() {
    let members = family.members
    for (role in members) {
        console.log(`role => ${role}, name => ${members[role].name} age => ${members[role].age}`)
    }  
}

printMembers()
console.log('---')

let members = family.members
members['삼촌'] = {age: 40, name: '홍순평'}

members.아들 = {age:29}
delete members.딸
delete members['반려동물']
printMembers()