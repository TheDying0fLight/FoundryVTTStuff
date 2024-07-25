///////////////////////////////////////////////////////
//////////////////// MACRO SYNOPSIS ///////////////////
///////////////////////////////////////////////////////
//
//  Checks to make sure each selected token is an NPC
//  and if so rolls separately for each token to:
//     - determine random coinage,
//     - adds that coin to the token
///////////////////////////////////////////////////////

// Foundry V12, D&D 5e 3.3.1

for (let c of canvas.tokens.controlled) {
    if (c.actor.type != "npc") {
        console.log("XXXXX__//  ", c.actor.name, "is a ", c.actor.type, "   \\\\__XXXXX");
        continue;
    } else {
        let tokActor = c.actor;

        const rand = await new Roll("1d100").evaluate();

        console.log("_________________________________________________________")
        console.log("!!!", tokActor.name, " Random Roll: ", rand.total);

        let cr = tokActor.system.details.cr
        let gp_avg

        // uses this curve https://www.desmos.com/calculator/ztucq3gnqs
        // to approximate this post https://www.reddit.com/r/DnDBehindTheScreen/comments/8rksak/after_looking_for_a_loottreasure_table_by_cr_i/
        if (cr < 7)
            gp_avg = 2.4*Math.pow(cr,1.2)+1;
        else if (cr < 13)
            gp_avg = 35*(cr-6.1)
        else if (cr < 19)
            gp_avg = 350(cr-12.1)
        else
            gp_avg = 3500(cr-18.1)

        let loot = Math.floor(gp_avg*rand.total*2)
        console.log("", loot, "cp or ", loot/1000, "pp")

        let cp = (loot%10)
        loot = Math.floor(loot/10)
        let sp = (loot%10)
        loot = Math.floor(loot/10)
        let gp = (loot%10)
        loot = Math.floor(loot/10)
        let pp = loot

        await tokActor.update({"system.currency.cp": cp, "system.currency.sp": sp, "system.currency.gp": gp, "system.currency.pp": pp});

        console.log("_________________________________________________________")

    }
}