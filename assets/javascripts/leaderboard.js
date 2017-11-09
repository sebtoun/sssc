"use strict";

// <li><span class="score">1000</span> <span class="playername">AAA</span></li>

var loadLeaderBoard = function() {
    var url = "https://wt-a89f61fd25d1773a3cff1712ca7d1c33-0.run.webtask.io/sssc-leaderboard";

    function createScoreListEntry(scoreEntry) {
        var li = document.createElement('li');

        var score = document.createElement('span');
        score.className = 'score';
        score.textContent = scoreEntry.score;

        var name = document.createElement('span');
        name.className = 'playername';
        name.textContent = scoreEntry.playername;
        li.appendChild(score);
        li.appendChild(document.createTextNode(" "));
        li.appendChild(name);

        return li;
    }

    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (r.readyState === XMLHttpRequest.DONE) {
            if (r.status !== 200) return;

            var highscores = JSON.parse(r.responseText).highscores;
            if (highscores){
                var list = document.getElementById('leaderboard').querySelector('ul.leaderboard');
                while (list.firstChild) {
                    list.removeChild(list.firstChild);
                }
                var fragment = document.createDocumentFragment();
                highscores.forEach(function (entry) {
                    var item = createScoreListEntry(entry);
                    fragment.appendChild(item);
                });
                list.appendChild(fragment);
            }
        }
    };
    r.open("GET", url, true);
    r.send(null);
};