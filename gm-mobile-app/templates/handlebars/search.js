<header>
    {{> backhome}}
    <h1>Recherche "{{search}}"</h1>
</header>
<h2>Résultats</h2>
{{#unless results}}
<p class="gm-no-result">Aucune gare ne correspond à cette recherche</p>
{{else}}
<ul class="gm-station-list">
    {{#each results}}
    <li data-station-code="{{code}}">
        {{> stationview}}
    </li>
    {{/each}}
</ul>
{{/unless}}
<h2>Autre recherche</h2>
{{> searchform}}
