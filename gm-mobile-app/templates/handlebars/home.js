<header>
    <h1>Gare mobile</h1>
</header>
<h2>Gare favorites</h2>
{{#if stations}}
<ul class="gm-station-list">
    {{#each stations}}
    <li data-station-code="{{code}}">
        {{> stationview}}
    </li>
    {{/each}}
</ul>
{{/if}}
<p class="help"{{#if stations.length}} style="display:none;"{{/if}}>Aucune gare favorite</p>

<h2>Ajouter des gares favorites</h2>
{{> searchform}}

