var family = {
    'address': 'Seoul',
    members: {},
    addFamily: function(age, name, role) {
        this.members[role] = {
            age, name
        }
    },
    getHeadcount: function() {
        return Object.keys(this.members).length
    }
}

family.addFamily(30, '김태우', '아들')
family.addFamily(29, '홍순범', '그냥')
console.log(family.getHeadcount())
console.log(family.members.length)