<header>
    {{> backhome}}
    <h1>{{station.name}}</h1>
</header>
<h2>Départs de {{station.name}}{{#if time}} à partir de {{time}}{{/if}}</h2>
<p class="gm-toolbar">
    <a href="#/departures/{{station.code}}" class="yui3-button">↻&nbsp;Actualiser</a>
</p>
{{#if trains}}
    <ul class="gm-departures">
        {{#each trains}}
            {{> trainview}}
        {{/each}}
    </ul>
{{else}}
    <p class="gm-error">Une erreur s'est produite durant le chargement des horaires de départs.</p>
{{/if}}

