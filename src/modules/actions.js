import { renderView } from './display';
import ROUTES from './routes';
// eslint-disable-next-line object-curly-newline
import { $, camelCaseToString, isEmpty, pokeByName } from './utilities';
import ACHIEVEMENTS from './achievements';
import { POKEDEXFLAGS, VITAMINS } from './data';
import { openModal, closeModal } from './modalEvents';
import Poke from './poke';
import POKEDEX from './db';

export default (player, combatLoop, enemy, town, story, appModel) => {
    let dom;

    const UserActions = {

        changeRoute: function (newRouteId, force = false) {
            if (!force && player.alivePokeIndexes().length == 0) {
                alert('It is too dangerous to travel without a POKEMON.');
                return false;
            }
            if (combatLoop.prof || combatLoop.prof1 || combatLoop.prof2 || combatLoop.prof3) {
                alert('You cannot run away from a PROFESSOR battle.');
                return false;
            }
            if (combatLoop.gymLeader || combatLoop.gymLeader1 || combatLoop.gymLeader2 || combatLoop.gymLeader3) {
                alert('You cannot run away from a GYM LEADER battle.');
                return false;
            }
            if (!player.routeUnlocked(player.settings.currentRegionId, newRouteId)) {
                alert('You cannot go there yet.');
                return false;
            }
            player.settings.currentRouteId = newRouteId;
            if (ROUTES[player.settings.currentRegionId][player.settings.currentRouteId].town) {
                combatLoop.pause();
            } else {
                combatLoop.unpause();
            }
            renderView(dom, enemy, player);
            player.savePokes();
            dom.renderRouteList();

            return true;
        },
        changePokemon: function (newActiveIndex) {
            player.setActive(newActiveIndex);
            renderView(dom, enemy, player);
        },
        goToKanto: function () {
            if (player.regionUnlocked('Kanto')) {
                player.settings.currentRegionId = 'Kanto';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToJohto: function () {
            if (player.regionUnlocked('Johto')) {
                player.settings.currentRegionId = 'Johto';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToHoenn: function () {
            if (player.regionUnlocked('Hoenn')) {
                player.settings.currentRegionId = 'Hoenn';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToSinnoh: function () {
            if (player.regionUnlocked('Sinnoh')) {
                player.settings.currentRegionId = 'Sinnoh';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToUnova: function () {
            if (player.regionUnlocked('Unova')) {
                player.settings.currentRegionId = 'Unova';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToKalos: function () {
            if (player.regionUnlocked('Kalos')) {
                player.settings.currentRegionId = 'Kalos';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToAlola: function () {
            if (player.regionUnlocked('Alola')) {
                player.settings.currentRegionId = 'Alola';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToGalar: function () {
            if (player.regionUnlocked('Galar')) {
                player.settings.currentRegionId = 'Galar';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                alert('You have not unlocked this region yet');
            }
        },
        goToNone: function () {
            alert('This region is not implemented yet');
        },
        enablePokeListAutoSort: function () {
            player.settings.autoSort = $('#autoSort').checked;
            // hide or show sort dropdowns
            dom.renderPokeSort();
        },
        changeCatchOption: function (newCatchOption) {
            combatLoop.changeCatch(newCatchOption);
        },
        changeListView: function (view) {
            player.settings.listView = view;
        },
        clearGameData: function () {
            if (dom.checkConfirmed('#confirmClearData')) {
                localStorage.clear();
                player.purgeData = true;
                window.location.reload(true);
            }
        },
        changeSelectedBall: function (newBall) {
            player.changeSelectedBall(newBall);
        },
        pokemonToFirst: function (pokemonIndex, from = 'roster') {
            appModel.$store.commit('pokemon/moveToFirst', { pokemonIndex, from });
            player.savePokes();
        },
        pokemonToDown: function (pokemonIndex, from = 'roster') {
            appModel.$store.commit('pokemon/moveDown', { pokemonIndex, from });
            player.savePokes();
        },
        pokemonToUp: function (pokemonIndex, from = 'roster') {
            appModel.$store.commit('pokemon/moveUp', { pokemonIndex, from });
            player.savePokes();
        },
        evolvePokemon: function (pokemonIndex) {
            player.getPokemon()[pokemonIndex].tryEvolve(player.getPokemon()[pokemonIndex].shiny(), player);
            renderView(dom, enemy, player);
        },
        prestigePokemon: function (pokemonIndex) {
            player.getPokemon()[pokemonIndex].tryPrestige(player.getPokemon()[pokemonIndex].shiny());
            renderView(dom, enemy, player);
        },
        moveToStorage: function (pokemonIndex) {
            appModel.$store.commit('pokemon/deposit', pokemonIndex);
        },
        moveToRoster: function (pokemonIndex) {
            appModel.$store.commit('pokemon/withdraw', pokemonIndex);
        },
        openPokeDex: function () {
            openModal($('#pokedexModal'));
        },
        forceSave: function () {
            player.savePokes();
            $('#forceSave').style.display = 'inline';
            setTimeout(() => { $('#forceSave').style.display = 'none'; }, 5000);
        },
        exportSaveDialog: function () {
            $('#savetextDialog .modal-card-title').innerHTML = 'Export your save';
            if (document.queryCommandSupported('copy')) {
                document.getElementById('copySaveText').style.display = 'initial';
            }
            document.getElementById('saveText').value = player.saveToString();
            document.getElementById('loadButtonContainer').style.display = 'none';
            openModal(document.getElementById('savetextModal'));
            closeModal($('#settingsModal'));
        },
        importSaveDialog: function () {
            $('#savetextDialog .modal-card-title').innerHTML = 'Import a save';
            document.getElementById('copySaveText').style.display = 'none';
            document.getElementById('saveText').value = '';
            document.getElementById('loadButtonContainer').style.display = 'block';
            openModal(document.getElementById('savetextModal'));
            closeModal($('#settingsModal'));
        },
        importSave: async function () {
            if (window.confirm('Loading a save will overwrite your current progress, are you sure you wish to continue?')) {
                await appModel.$store.dispatch('setLoading', true);
                player.loadFromString(document.getElementById('saveText').value.trim());
                await appModel.$store.dispatch('setLoading', false);
                closeModal(document.getElementById('savetextModal'));
                // reload everything
                renderView(dom, enemy, player);
                dom.renderPokeSort();
                dom.renderBalls();
                dom.renderPokeCoins();
            }
        },
        copySaveText: function () {
            document.getElementById('saveText').select();
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        },
        changeSpriteChoice: function () {
            if (document.getElementById('spriteChoiceFront').checked) {
                player.settings.spriteChoice = 'front';
            } else {
                player.settings.spriteChoice = 'back';
            }
            player.savePokes();
            renderView(dom, enemy, player);
        },
        viewStatistics: function () {
            const statisticStrings = {
                'fireBeaten': 'Fire POKEMON Beaten',
                'waterBeaten': 'Water POKEMON Beaten',
                'grassBeaten': 'Grass POKEMON Beaten',
                'electricBeaten': 'Electric POKEMON Beaten',
                'normalBeaten': 'Normal POKEMON Beaten',
                'iceBeaten': 'Ice POKEMON Beaten',
                'fightingBeaten': 'Fighting POKEMON Beaten',
                'poisonBeaten': 'Poison POKEMON Beaten',
                'groundBeaten': 'Ground POKEMON Beaten',
                'flyingBeaten': 'Flying POKEMON Beaten',
                'psychicBeaten': 'Psychic POKEMON Beaten',
                'bugBeaten': 'Bug POKEMON Beaten',
                'rockBeaten': 'Rock POKEMON Beaten',
                'ghostBeaten': 'Ghost POKEMON Beaten',
                'darkBeaten': 'Dark POKEMON Beaten',
                'dragonBeaten': 'Dragon POKEMON Beaten',
                'steelBeaten': 'Steel POKEMON Beaten',
                'fairyBeaten': 'Fairy POKEMON Beaten',
                'fireCaught': 'Fire POKEMON Caught',
                'waterCaught': 'Water POKEMON Caught',
                'grassCaught': 'Grass POKEMON Caught',
                'electricCaught': 'Electric POKEMON Caught',
                'normalCaught': 'Normal POKEMON Caught',
                'iceCaught': 'Ice POKEMON Caught',
                'fightingCaught': 'Fighting POKEMON Caught',
                'poisonCaught': 'Poison POKEMON Caught',
                'groundCaught': 'Ground POKEMON Caught',
                'flyingCaught': 'Flying POKEMON Caught',
                'psychicCaught': 'Psychic POKEMON Caught',
                'bugCaught': 'Bug POKEMON Caught',
                'rockCaught': 'Rock POKEMON Caught',
                'ghostCaught': 'Ghost POKEMON Caught',
                'darkCaught': 'Dark POKEMON Caught',
                'dragonCaught': 'Dragon POKEMON Caught',
                'steelCaught': 'Steel POKEMON Caught',
                'fairyCaught': 'Fairy POKEMON Caught',
                'seen': 'Pokemon Seen',
                'caught': 'Pokemon Caught',
                'released': 'Pokemon Released',
                'sold': 'Pokemon Sold',
                'beaten': 'Pokemon Beaten',
                'shinySeen': 'Shiny Pokemon Seen',
                'shinyCaught': 'Shiny Pokemon Caught',
                'shinyReleased': 'Shiny Pokemon Released',
                'shinyBeaten': 'Shiny Pokemon Beaten',
                'totalDamage': 'Total Damage Dealt',
                'totalThrows': 'Total Catch Attempts',
                'successfulThrows': 'Successfully Caught',
                'pokeballThrows': 'Pokeball Throws',
                'pokeballSuccessfulThrows': 'Caught with Pokeball',
                'greatballThrows': 'Greatball Throws',
                'greatballSuccessfulThrows': 'Caught with Greatball',
                'ultraballThrows': 'Ultraball Throws',
                'ultraballSuccessfulThrows': 'Caught with Ultraball',
                'masterballThrows': 'Masterball Throws',
                'masterballSuccessfulThrows': 'Caught with Masterball',
                'totalPokeCoins': 'Total PokeCoins Obtained',
                'totalCatchCoins': 'Total CatchCoins Obtained',
                'totalBattleCoins': 'Total BattleCoins Obtained',
                'totalExp': 'Total Experience Earned',
            };
            let statList = '';
            for (const statValue in player.statistics) {
                statList += `<li>${statisticStrings[statValue]}: ${player.statistics[statValue]}</li>`;
            }
            document.getElementById('statisticsList').innerHTML = statList;
            openModal(document.getElementById('statisticsModal'));
        },
        viewAchievements: function () {
            let achievementHTML = '';
            let completeState; let
                complete;
            for (const subgroup in ACHIEVEMENTS.statistics) {
                for (let i = 0, count = ACHIEVEMENTS.statistics[subgroup].length; i < count; i++) {
                    complete = (player.statistics[subgroup] >= ACHIEVEMENTS.statistics[subgroup][i].value);
                    completeState = complete ? ACHIEVEMENTS.statistics[subgroup][i].value : player.statistics[subgroup];
                    achievementHTML += `<li${complete ? ' class="complete"' : ''}><b>${ACHIEVEMENTS.statistics[subgroup][i].name}</b>: ${camelCaseToString(subgroup)} ${completeState}/${ACHIEVEMENTS.statistics[subgroup][i].value}</li>`;
                }
            }
            for (let i = 0, count = ACHIEVEMENTS.dex.caughtCount.length; i < count; i++) {
                const progress = player.countPokedex(POKEDEXFLAGS.releasedNormal);
                complete = (progress >= ACHIEVEMENTS.dex.caughtCount[i].value);
                completeState = complete ? ACHIEVEMENTS.dex.caughtCount[i].value : progress;
                achievementHTML += `<li${complete ? ' class="complete"' : ''}><b>${ACHIEVEMENTS.dex.caughtCount[i].name}</b>: Unique Caught ${completeState}/${ACHIEVEMENTS.dex.caughtCount[i].value}</li>`;
            }
            for (let i = 0, count = ACHIEVEMENTS.dex.caught.length; i < count; i++) {
                let progress = 0;
                const needed = ACHIEVEMENTS.dex.caught[i].pokes.length;
                let string = '';
                for (let j = 0; j < needed; j++) {
                    const pokeName = ACHIEVEMENTS.dex.caught[i].pokes[j];
                    string += (j > 0) ? ', ' : '';
                    if (player.hasDexEntry(pokeName, POKEDEXFLAGS.releasedNormal)) {
                        string += `<s>${pokeName}</s>`;
                        progress++;
                    } else {
                        string += pokeName;
                    }
                }
                complete = (progress >= needed);
                completeState = complete ? needed : progress;
                achievementHTML += `<li${complete ? ' class="complete"' : ''}><b>${ACHIEVEMENTS.dex.caught[i].name}</b>: Catch ${string}</li>`;
            }
            document.getElementById('achievementsList').innerHTML = achievementHTML;
            openModal(document.getElementById('achievementsModal'));
        },
        viewInventory: function () {
            let inventoryHTML = '';
            const vitamins = Object.keys(VITAMINS);
            for (let i = 0; i < vitamins.length; i++) {
                const vitamin = vitamins[i];
                const vitaminName = VITAMINS[vitamin].display;
                const count = player.vitamins[vitamin];
                const image = `assets/images/vitamins/${vitamin}.png`;
                inventoryHTML += `<li class="vitaminItem"><div class="inventoryVitaminAlignmentHelper"></div><img src="${image}"></img><span class="itemName">${vitaminName}</span><button class="button" onclick="userInteractions.openVitaminModal('${vitamin}')">Use (${count} available)</button></li>`;
            }
            document.getElementById('inventoryList').innerHTML = inventoryHTML;
            openModal(document.getElementById('inventoryModal'));
        },
        enterCode: function () {
            // eslint-disable-next-line prefer-const
            let secretCode = prompt('Please enter your secret code', 'Secret Code');
            if (secretCode === 'Charmander' && !player.secretCodes.charmander) {
                player.addPoke(new Poke(pokeByName('Charmander'), 50));
                player.secretCodes.charmander = true;
            } else {
                alert('Code Invalid or Already Claimed');
            }
        },
        viewBadges: function () {
            if (!isEmpty(player.badges)) {
                let badgesHTML = '';
                for (const badge in player.badges) {
                    badgesHTML += `${'<img src="assets/images/badges/'}${[badge]}.png"></img>`;
                }
                document.getElementById('badgeList').innerHTML = badgesHTML;
                openModal(document.getElementById('badgesModal'));
            } else {
                alert('You have no Badges');
            }
        },
        viewEvoStones: function () {
            if (!isEmpty(player.evoStones)) {
                let evoStonesHTML = '';
                for (const evoStones in player.evoStones) {
                    evoStonesHTML += `${'<img src="assets/images/evoStones/'}${[evoStones]}.png"></img>`;
                }
                document.getElementById('evoStoneList').innerHTML = evoStonesHTML;
                openModal(document.getElementById('evoStonesModal'));
            } else {
                alert('You have no Evolution Stones');
            }
        },
        viewKeyItems: function () {
            if (!isEmpty(player.unlocked)) {
                let keyItemsHTML = '';
                for (const keyItems in player.unlocked) {
                    keyItemsHTML += `${'<img src="assets/images/keyItems/'}${[keyItems]}.png"></img>`;
                }
                document.getElementById('keyItemsList').innerHTML = keyItemsHTML;
                openModal(document.getElementById('keyItemsModal'));
            } else {
                alert('You have no Key Items');
            }
        },
        viewTown: function () {
            const region = player.settings.currentRegionId.toLowerCase();
            town.renderPokeCoinShop(region);
            town.renderBattleCoinShop(region);
            town.renderCatchCoinShop(region);
            openModal(document.getElementById('townModal'));
        },
        openVitaminModal: function (vitamin) {
            if (!VITAMINS[vitamin]) {
                return alert(`Invalid vitamin '${vitamin}'`);
            }
            const data = VITAMINS[vitamin];
            const name = data.display;
            const count = player.vitamins[vitamin];
            if (!count) {
                return alert('You don\'t have any of these.');
            }
            const vitaminModal = document.getElementById('vitaminModal');
            vitaminModal.setAttribute('data-vitamin', vitamin);
            this.updateVitaminModal();
            openModal(vitaminModal);
        },
        updateVitaminModal: function () {
            const vitaminModal = document.getElementById('vitaminModal');
            const vitamin = vitaminModal.getAttribute('data-vitamin');
            const data = VITAMINS[vitamin];
            const count = player.vitamins[vitamin];
            document.getElementById('vitaminName').innerText = data.display;
            document.getElementById('vitaminCount').innerText = count;
            let vitaminPokemonHTML = '';
            const list = player.getPokemon();
            for (let i = 0; i < list.length; i++) {
                const poke = list[i];
                vitaminPokemonHTML += `<li class="vitaminModalPokemon"><img src="${poke.image().party}"> <button class="button" onclick="userInteractions.useVitamin('${vitamin}', ${i})">${poke.getAppliedVitamins(data.stat)}/${poke.getMaxVitamins(data.stat)}</button></li>`;
            }
            document.getElementById('vitaminPokemon').innerHTML = vitaminPokemonHTML;
        },
        useVitamin: function (vitamin, pokemonIndex) {
            const vitaminData = VITAMINS[vitamin];
            const count = player.vitamins[vitamin];
            const poke = player.pokemons[pokemonIndex];
            if (count <= 0 || !vitaminData || !poke) {
                return;
            }
            if (poke.tryUsingVitamin(vitaminData.stat)) {
                player.vitamins[vitamin]--;
                this.updateVitaminModal();
            }
        },
        checkProfBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (!player.wins[routeData.prof.win]) {
                this.profBattle();
            }
            if (player.wins[routeData.prof.win] && !player.wins[routeData.prof1.win]) {
                this.prof1Battle();
            }
            if (player.wins[routeData.prof.win] && player.wins[routeData.prof1.win] && !player.wins[routeData.prof2.win]) {
                this.prof2Battle();
            }
            if (player.wins[routeData.prof.win] && player.wins[routeData.prof1.win] && player.wins[routeData.prof2.win] && !player.wins[routeData.prof3.win]) {
                this.prof3Battle();
            }
            if (player.wins[routeData.prof.win] && player.wins[routeData.prof1.win] && player.wins[routeData.prof2.win] && player.wins[routeData.prof3.win]) {
                this.prof3ABattle();
            }
        },
        checkGymLeaderBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (!player.wins[routeData.gymLeader.win]) {
                this.gymLeaderBattle();
            }
            if (player.wins[routeData.gymLeader.win] && !player.wins[routeData.gymLeader1.win]) {
                this.gymLeader1Battle();
            }
            if (player.wins[routeData.gymLeader.win] && player.wins[routeData.gymLeader1.win] && !player.wins[routeData.gymLeader2.win]) {
                this.gymLeader2Battle();
            }
            if (player.wins[routeData.gymLeader.win] && player.wins[routeData.gymLeader1.win] && player.wins[routeData.gymLeader2.win] && !player.wins[routeData.gymLeader3.win]) {
                this.gymLeader3Battle();
            }
            if (player.wins[routeData.gymLeader.win] && player.wins[routeData.gymLeader1.win] && player.wins[routeData.gymLeader2.win] && player.wins[routeData.gymLeader3.win]) {
                this.gymLeader3ABattle();
            }
        },
        checkNPCBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (routeData.npc.name === 'Nugget 5') {
                this.npcBattle();
            }
        },
        checkNPC: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (routeData.npc.name === 'Prof. Oak') {
                this.oakEvent();
            }
            if (routeData.npc.name === 'Pewter Museum') {
                this.pewterMuseumEvent();
            }
            if (routeData.npc.name === 'Nugget 5') {
                this.nuggetBridgeEvent();
            }
            if (routeData.npc.name === 'Bill') {
                this.billEvent();
            }
            if (routeData.npc.name === 'Cinnabar Lab') {
                this.cinnabarLabEvent();
            }
            if (routeData.npc.name === 'Steven\'s Home') {
                this.beldumEvent();
            }
            if (routeData.npc.name === 'Shrine\'s Old Man') {
                this.abundantOldManEvent();
            }
        },
        oakEvent: function () {
            alert('How is your Pokedex Coming along?');
        },
        pewterMuseumEvent: function () {
            if (player.events.pewterMuseum1 === true) {
                alert('Did you take that fossil to Cinnabar Island?');
            }
            if (!player.badges['Boulder Badge']) {
                alert('Why not beat Brock and come back?');
            }
            if (player.badges['Boulder Badge'] === true && !player.events.pewterMuseum1) {
                player.unlocked.oldAmber = true;
                alert('Congrats on the win. Take this Old Amber as a bonus');
                player.events.pewterMuseum1 = true;
            }
        },
        nuggetBridgeEvent: function () {
            if (player.events.nugget5 === true && !player.hasPokemon('Charmander')) {
                alert('I think you would do great in Team Rocket. Here is a Charmander as a bribe.');
                player.addPoke(new Poke(POKEDEX[4], 25));
                player.addPokedex('Charmander', POKEDEXFLAGS.ownNormal);
            }
            if (!player.events.nugget5) {
                alert('Defeat the 5 of us in a row to win a special prize!');
                this.checkNPCBattle();
            }
            if (player.events.nugget5 === true && player.hasPokemon('Charmander')) {
                alert('You feel like joining us yet?');
            }
        },
        billEvent: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (!player.events[routeData.npc.event]) {
                alert('Hi! Thanks for stopping by. Show me a Haunter, Machoke, Graveler, or Kadabra and I will give you their evolved forms');
                player.events[routeData.npc.event] = true;
            }
            if (player.hasPokemon('Machoke') && !player.hasPokemon('Machamp')) {
                player.addPoke(new Poke(POKEDEX[85], 25));
                player.addPokedex('Machamp', POKEDEXFLAGS.ownNormal);
                alert('I see you have a Machoke. Here is a Machamp');
            }
            if (player.hasPokemon('Kadabra') && !player.hasPokemon('Alakazam')) {
                player.addPoke(new Poke(POKEDEX[81], 25));
                player.addPokedex('Alakazam', POKEDEXFLAGS.ownNormal);
                alert('I see you have a Kadabra. Here is a Alakazam');
            }
            if (player.hasPokemon('Graveler') && !player.hasPokemon('Golem')) {
                player.addPoke(new Poke(POKEDEX[93], 25));
                player.addPokedex('Golem', POKEDEXFLAGS.ownNormal);
                alert('I see you have a Graveler. Here is a Golem');
            }
            if (player.hasPokemon('Haunter') && !player.hasPokemon('Gengar')) {
                player.addPoke(new Poke(POKEDEX[117], 25));
                player.addPokedex('Gengar', POKEDEXFLAGS.ownNormal);
                alert('I see you have a Haunter. Here is a Gengar');
            } else {
                alert('No trades right now. Sorry');
            }
        },
        cinnabarLabEvent: function () {
            if (!player.events.cinnabarLab1) {
                alert('Welcome, if you have any fossils we can restore them to the Pokemon they were.');
                player.events.cinnabarLab1 = true;
            }
            if (player.events.cinnabarLab1 === true && player.unlocked.oldAmber === true) {
                alert('Is that an Old Amber? Ha! Now it is an Aerodactyl');
                player.addPoke(new Poke(POKEDEX[171], 25));
                player.addPokedex('Aerodactyl', POKEDEXFLAGS.ownNormal);
            }
        },
        beldumEvent: function () {
            if (!player.events.beldum1) {
                alert('Congrats on being dope. Take this Beldum');
                player.addPoke(new Poke(pokeByName('Beldum'), 5));
                player.addPokedex('Beldum', POKEDEXFLAGS.ownNormal);
                player.events.beldum1 = true;
            } else {
                alert('No one is home');
            }
        },
        abundantOldManEvent: function () {
            if (!player.events.abundantShrineEvent && player.hasPokemon('Thundurus') && player.hasPokemon('Landorus') && player.hasPokemon('Tornadus')) {
                alert('Amazing that you\'ve tamed the Forces of Nature. Take this item to take them to the next level');
                player.evoStones.revealGlass = 1;
                player.events.abundantShrineEvent = true;
            }
            if (player.events.abundantShrineEvent === true) {
                alert('Have you tried using the Reveal Glass on the Forces of Nature yet?');
            }
            if (!player.events.abundantShrineEvent && !player.hasPokemon('Landorus')) {
                alert('Come back to me when you\'ve master the Forces of Nature');
            }
        },
        profBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (routeData.prof && routeData.prof.poke.length > 0) {
                combatLoop.prof = {
                    name: routeData.prof.name,
                    badge: routeData.prof.badge,
                    win: routeData.prof.win,
                    reward: routeData.prof.reward,
                };
                combatLoop.profPoke = Object.values({ ...routeData.prof.poke });
                combatLoop.unpause();
                combatLoop.refresh();
            }
        },
        gymLeaderBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (routeData.gymLeader && routeData.gymLeader.poke.length > 0) {
                combatLoop.gymLeader = { name: routeData.gymLeader.name, badge: routeData.gymLeader.badge, win: routeData.gymLeader.win };
                combatLoop.gymLeaderPoke = Object.values({ ...routeData.gymLeader.poke });
                combatLoop.unpause();
                combatLoop.refresh();
            }
        },
        npcBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (routeData.npc && routeData.npc.poke.length > 0) {
                combatLoop.npc = {
                    name: routeData.npc.name,
                    event: routeData.npc.event,
                };
                combatLoop.npcPoke = Object.values({ ...routeData.npc.poke });
                combatLoop.unpause();
                combatLoop.refresh();
            }
        },
        closeStory: function () {
            if (story.canClose) {
                $('#storyContainer').style.display = 'none';
            }
        },
        attachDOM: (_dom) => {
            dom = _dom;
        },
    };

    return UserActions;
};

export const dummy = new Proxy({}, {
    get(target, prop) {
        return () => {};
    },
});
