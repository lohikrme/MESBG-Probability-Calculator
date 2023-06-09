var spell_works_minimum = 1
var attacker_dice_amount = 4
var defender_dice_amount = 3

change_attacker_dice()
change_defender_dice()
spell_works_button_click()
spell_works_button_click()
calculate()

function spell_works_button_click() {
    let spell_works_value = parseInt(document.getElementById("spell-works-button").innerHTML)
    if (spell_works_value < 6) {
        spell_works_value += 1
    }
    else {
        spell_works_value = 1
    }
    spell_works_minimum = spell_works_value
    document.getElementById("spell-works-button").innerHTML = spell_works_value
}

function change_attacker_dice() {
    let new_attacker_dice_amount = parseInt(document.getElementById("attacker-dice-slider").value)
    attacker_dice_amount = new_attacker_dice_amount
    document.getElementById("attacker-dice-text").innerHTML = `Dice to cast the spell: ${new_attacker_dice_amount}`
}

function change_defender_dice() {
    let new_defender_dice_amount = parseInt(document.getElementById("defender-dice-slider").value)
    defender_dice_amount = new_defender_dice_amount
    document.getElementById("defender-dice-text").innerHTML = `Dice to resist the spell: ${new_defender_dice_amount}`
}

// factorial() is needed to be made manually to calculate factorializations
function factorial(num) {
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}

// skilled_vs_weak() function returns 2 probabilities: (skilled_win, weak_win) = (higher fight value opponent wins, lower fight value opponent wins).
// this function is taken from fight calculator and modified just a bit. Logic is that defender is basically "higher fight value",
// because defender wins on rolls such as 55 and 55. Just need to consider that the attacker need to reach at least minimum requirement.
// SEARCH THE PYTHON FILE FOR MORE INFORMATION ABOUT THE MATHEMATICAL FOUNDATION OF THIS FUNCTION!

// So, this function basically runs through loops, where first loop is about winning with 6, 5, 4, 3, 2.
// we can use these loops for our help. Because it means that if weaker wins with for example 3 or 2, while spell
// requires 4, then it is impossible. So we modify this function to go only that much inner loops that
// the required dice minimum for spell to work is fullfilled.
function skilled_vs_weak(skilled_dice, weak_dice) {
    let probability_per_round = 0
    let weak_wins = 0
    let skilled_wins = 0
    let answer = []
    for (winning_dice_minus1 = 5; winning_dice_minus1 > 0; winning_dice_minus1--) {
        for (round_inside = 1; round_inside < weak_dice + 1; round_inside++) {
            probability_per_round = ((1 / 6) ** round_inside * (winning_dice_minus1 / 6) ** (weak_dice - round_inside)) * ((factorial(weak_dice)) / (factorial(round_inside) * factorial(weak_dice - round_inside))) * (winning_dice_minus1 / 6) ** skilled_dice
            if (winning_dice_minus1 + 1 >= spell_works_minimum) {
                weak_wins += probability_per_round
            }
        }
    }
    skilled_wins = 1 - weak_wins
    answer.push(skilled_wins)
    answer.push(weak_wins)
    return answer
}

// in this case only thing that matters is to get max dice value which is as high or higher than the minimum required for spell to work
// calculate probability to succeed in spell by using complement
function only_attacks_matter() {
    let probability_to_succeed = 0
    probability_to_succeed = 1 - (((spell_works_minimum - 1) / 6) ** attacker_dice_amount)
    return probability_to_succeed
}


// this function takes answer from the modified skilled_vs_weak() function.
// but in case defender does not have any dice this function uses another function called "only_attacks_matter()"
function probability_to_get_magic_through() {
    let attacker_wins = 0
    if (defender_dice_amount == 0) {
        attacker_wins = only_attacks_matter()
    }
    else {
        answer = skilled_vs_weak(defender_dice_amount, attacker_dice_amount)
        attacker_wins = answer[1]
    }
    return attacker_wins
}

function calculate() {
    change_attacker_dice()
    change_defender_dice()
    console.log("Spell works on minimum value of: " + spell_works_minimum + ".")
    console.log(`Attacker has ${attacker_dice_amount} dice to cast the spell.`)
    console.log(`Defender has ${defender_dice_amount} dice to resist the spell.`)
    answer = probability_to_get_magic_through()
    console.log(answer)
    document.getElementById("answer").innerHTML = `The probability that the spell goes in and works is: ${parseFloat(answer * 100).toFixed(2)}%`
}