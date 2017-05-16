# L’ebook redistribuable
Une introduction rapide et interactive à l’usage des éditeurs, graphistes et simples curieux.

## Aspects techniques

Cet article est également une expérimentation de mise en pages.

Il a été conçu avec une approche d’amélioration progressive : si CSS Grid n’est pas supporté, on utilise Flexbox et quelques hacks ; si CSS Grid (non-préfixé) est supporté, on remplace Flexbox et les hacks.

### Résumé

- chaque section dispose d’un `display: grid` avec un template de 3 colonnes « responsive » ;
- certains conteneurs héritent de ce template (démos, code, illustrations full-width) ;
- une grille « freestyle » a été conçue pour les configurations de réglages utilisateurs ;
- le toggle « Mode Scan » est en `position: sticky` ;
- `header` et `footer` utilisent flexbox + les unités viewport ;
- les features Open Type de Vollkorn sont utilisées.

### Remarques utiles

- `position: sticky` ne fonctionne pas si `html` ou `body` sont en `overflow: hidden` ;
- le hack « full-width » avec les unités viewport ne fonctionne pas parfaitement sur mobile ;
- Les marges verticales ne « collapsent » pas dans `display: grid`, ce qui peut créer quelques complications si une `grid-gap` est définie ;
- pour la grille « freestyle », Firefox a besoin de `grid-auto-row: 1fr` pour gérer les décalages correctement ;
- les éléments « gutter » doivent avoir un `column-row-span` adapté pour ne pas créer une rangée supplémentaire donc foirer la marge de l’élément suivant ;
- il faut quasiment un reset pour Grid dans cette configuration (usage sur `section`).

## Licence

Copyright (C) 2017 Jiminy Panoz, tous droits réservés pour le texte et illustrations.