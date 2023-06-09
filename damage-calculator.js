
// needed global variables
var own_attacks = 5
var own_strength = 5
var enemy_defence = 5
var enemy_strength = 5
var rend_is_on = false
var two_handed_weapon_is_on = false
var reroll_one_is_on = false
var reroll_all_is_on = false
var anduril_is_on = false

// make sure html is instantly refreshed and ready to use
own_attacks_input()
own_strength_input()
enemy_defence_input()
enemy_strength_input()
launch_calculator()

// change own attack amount
function own_attacks_input() {
    function change_own_attacks() {
        let value = document.getElementById("own-attacks-slider").value
        document.getElementById("text-own-attacks").innerHTML = `Own attacks: ${value}`
        return parseInt(value)
    }
    own_attacks = change_own_attacks()
}

// change own strength
function own_strength_input() {
    function change_own_strength() {
        let value = document.getElementById("own-strength-slider").value
        document.getElementById("text-own-strength").innerHTML = `Own strength: ${value}`
        return parseInt(value)
    }
    own_strength = change_own_strength()
}

// change enemy defence
function enemy_defence_input() {
    function change_enemy_defence() {
        let value = document.getElementById("enemy-defence-slider").value
        document.getElementById("text-enemy-defence").innerHTML = `Enemy defence: ${value}`
        return parseInt(value)
    }
    enemy_defence = change_enemy_defence()
}

// change enemy strength
function enemy_strength_input() {
    function change_enemy_strength() {
        let value = document.getElementById("enemy-strength-slider").value
        document.getElementById("text-enemy-strength").innerHTML = `Enemy strength: ${value}`
        return parseInt(value)
    }
    enemy_strength = change_enemy_strength()
}

// change rend_is_on
function rend_click() {
    if (two_handed_weapon_is_on == false && reroll_one_is_on == false && reroll_all_is_on == false && anduril_is_on == false) {
        function change_rend() {
            if (rend_is_on == true) {
                document.getElementById("rend-button").style.backgroundColor = `white`
                return false
            }
            else if (rend_is_on == false) {
                document.getElementById("rend-button").style.backgroundColor = `green`
                return true
            }
        }
        rend_is_on = change_rend()
    }
}

// change two_handed_weapon_is_on
function two_handed_weapon_click() {
    if (rend_is_on == false && reroll_all_is_on == false) {
        function change_two_handed_weapon() {
            if (two_handed_weapon_is_on == true) {
                document.getElementById("two-handed-weapon-button").style.backgroundColor = `white`
                return false
            }
            else if (two_handed_weapon_is_on == false) {
                document.getElementById("two-handed-weapon-button").style.backgroundColor = `green`
                return true
            }
        }
        two_handed_weapon_is_on = change_two_handed_weapon()
    }
}

// change reroll_one_is_on
function reroll_one_click() {
    if (rend_is_on == false && reroll_all_is_on == false) {
        function change_reroll_one() {
            if (reroll_one_is_on == true) {
                document.getElementById("reroll-one-button").style.backgroundColor = `white`
                return false
            }
            else if (reroll_one_is_on == false) {
                document.getElementById("reroll-one-button").style.backgroundColor = `green`
                return true
            }
        }
        reroll_one_is_on = change_reroll_one()
    }
}

// change reroll_all_is_on
function reroll_all_click() {
    if (rend_is_on == false && two_handed_weapon_is_on == false && reroll_one_is_on == false && anduril_is_on == false) {
        function change_reroll_all() {
            if (reroll_all_is_on == true) {
                document.getElementById("reroll-all-button").style.backgroundColor = `white`
                return false
            }
            else if (reroll_all_is_on == false) {
                document.getElementById("reroll-all-button").style.backgroundColor = `green`
                return true
            }
        }
        reroll_all_is_on = change_reroll_all()
    }
}

// change anduril_is_on
function anduril_click() {
    if (rend_is_on == false && reroll_all_is_on == false) {
        function change_anduril() {
            if (anduril_is_on == true) {
                document.getElementById("anduril-button").style.backgroundColor = `white`
                return false
            }
            else if (anduril_is_on == false) {
                document.getElementById("anduril-button").style.backgroundColor = `green`
                return true
            }
        }
        anduril_is_on = change_anduril()
    }
}



// choose a correct calculator and then update stats for the calculator
function launch_calculator() {
    if (rend_is_on) {
        rend_calculator()
    }
    else if (reroll_all_is_on) {
        reroll_all_calculator()
    }
    else if (anduril_is_on) {
        anduril_calculator()
    }
    else if (two_handed_weapon_is_on == true && reroll_one_is_on == false) {
        two_handed_calculator()
    }
    else if (two_handed_weapon_is_on == true && reroll_one_is_on == true) {
        two_handed_reroll_one_calculator()
    }
    else if (two_handed_weapon_is_on == false && reroll_one_is_on == true) {
        one_handed_reroll_one_calculator()
    }
    else {
        normal_calculator()
    }


}
// here will be different calculators. please note that most of these calculators use
// the file wound-charts.js as the source for different wound charts!

// rend calculator comes first because it does not coexist with other abilities
function rend_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * rend_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// reroll all calculator comes second because also this does not coexist with other abilities
function reroll_all_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * reroll_all_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}


// anduril comes third because it has own rules which do not require the wound charts
function anduril_calculator() {
    // anduril wounds normally on 4+ roll = 3/6
    let factor = 3 / 6
    let wounds_dealt = 0
    // with two-handed mode anduril obviously rolls 3+ roll = 4/6
    if (two_handed_weapon_is_on == true && reroll_one_is_on == false) {
        factor = 4 / 6
    }
    else if (two_handed_weapon_is_on == true && reroll_one_is_on == true) {
        // factor = (1/6) * (4/6) + (4/6)
        factor = 7 / 9
    }
    else if (two_handed_weapon_is_on == false && reroll_one_is_on == true) {
        // factor = (1/6) * (3/6) + (3/6)
        factor = 7 / 12
    }
    for (i = 0; i < own_attacks; i++) {
        wounds_dealt += 1 * factor
    }
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`

}

// now the more usual calculators begin from the two_handed_calculator
function two_handed_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * two_handed_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// two handed in situation when can also reroll ones
function two_handed_reroll_one_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * two_handed_reroll_one_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// this is for situations when reroll one is true but two-handed is false
function one_handed_reroll_one_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * one_handed_reroll_one_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}

// when all special abilities are false, then normal_calculator is used
function normal_calculator() {
    let wounds_dealt = 0
    function how_many_wounds() {
        let wounds_dealt2 = 0
        for (i = 0; i < own_attacks; i++) {
            wounds_dealt2 += 1 * normal_wound_chart()
        }
        return wounds_dealt2
    }
    wounds_dealt = how_many_wounds()
    document.getElementById("answer").innerHTML = `Average wounds caused: ${parseFloat(wounds_dealt.toFixed(3))}`
}