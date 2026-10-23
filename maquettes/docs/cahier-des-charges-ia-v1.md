# Cahier des charges — Assistant IA PIM Industrie (V1)

**Projet :** Assistant interne d’aide à la prescription produit / solution  
**Entreprise :** PIM Industrie  
**Version :** V1  
**Statut :** Draft  
**Date :** 20 octobre 2026  
**Périmètre :** Usage interne uniquement (réseau entreprise)

---

## 1. Contexte et objectifs

PIM Industrie dispose de ~50 ans d’expertise (produits, process, secteurs, historiques de projets). L’objectif de la V1 est de mettre à disposition des équipes internes un **assistant conversationnel** capable de :

1. Comprendre un besoin client (secteur, environnement, contraintes).
2. S’appuyer sur la documentation et le catalogue métier.
3. **Proposer** des orientations produit / solution argumentées.
4. Orienter vers un contact humain pour la suite (étude, devis, validation).

L’assistant ne remplace pas le bureau d’études ni le commercial : il **accélère** l’orientation et la préparation d’une réponse.

### Objectifs mesurables V1

| Objectif | Critère de succès |
|----------|-------------------|
| Pertinence | Sur 10 questions types métier, ≥ 8 orientations jugées correctes |
| Fiabilité | Pas d’invention de références / prix / normes |
| Disponibilité | Accessible sur le réseau interne (intranet / VPN) |
| Traçabilité | Réponses basées sur des documents / fiches indexés |
| Adoption | Utilisable via l’interface chatbot du site / outil interne |

---

## 2. Périmètre V1 (inclus)

- Chatbot textuel en **français**
- Déploiement **100 % interne** (pas d’appel à des API cloud externes pour les données métier)
- Recherche documentaire sémantique (RAG) sur :
  - fiches produits (claviers, circuits, faces avant, décoration…)
  - pages process / secteurs
  - glossaire et contenus validés
- Agent conversationnel capable d’enchaîner : comprendre → chercher → proposer
- Interface visuelle déjà esquissée dans les maquettes site (widget « Assistant PIM »)
- Réponses structurées du type :
  - reformulation du besoin
  - options recommandées (1 à 3)
  - points de vigilance (IP, tactile, rétroéclairage…)
  - invitation à valider avec un expert / contact

---

## 3. Hors périmètre V1 (exclus)

| Exclu en V1 | Reporté |
|-------------|---------|
| Devis automatique engageant | Phase ultérieure (règles métier / ERP) |
| Calcul de prix par le LLM | Interdit durablement (hors moteur métier) |
| Génération d’images produit | Phase 2 / 3 |
| Connexion clients externes (site public) | Après validation interne |
| Multilingue EN / DE | Après stabilisation FR |
| Remplacement du CRM / ERP | Hors scope |

---

## 4. Utilisateurs cibles

| Profil | Usage principal |
|--------|-----------------|
| Commercial | Orienter rapidement un besoin client |
| Bureau d’études | Vérifier des pistes techniques / options |
| Marketing / communication | S’appuyer sur un discours produit cohérent |
| Direction / projet | Démonstrateur interne de la valeur IA |

**Accès :** comptes internes uniquement. Pas d’accès public en V1.

---

## 5. Cas d’usage prioritaires (V1)

1. « Client médical, besoin d’un clavier étanche aux projections. »
2. « Pupitre machine-outil, besoin de rétroéclairage et sensation de clic. »
3. « Différence clavier capacitif vs touche mécanique / membrane. »
4. « Face avant plastique ou insert métallique pour identification machine. »
5. « Quelles options sur un clavier à membrane (LED, blindage, CMS…) ? »

Ces 5 scénarios serviront de **banc de test** de recette.

---

## 6. Architecture technique cible (V1)

```
Utilisateur interne
        │
        ▼
Interface chatbot (maquette / app interne)
        │
        ▼
Agent LangGraph
        │
        ├── Outil search_docs  → Qdrant (docs & fiches)
        ├── Outil get_product  → catalogue structuré (fichier / API)
        └── LLM Mistral        → self-host (vLLM / Ollama)
```

### Composants

| Composant | Rôle V1 | Notes |
|-----------|---------|--------|
| **LangGraph** | Orchestration de l’agent | Décide quand chercher / répondre |
| **Mistral** | Génération de texte FR | Hébergé en interne |
| **Qdrant** | Base vectorielle | Documents et contenus métier |
| **Catalogue structuré** | Produits / options | Excel, JSON ou API ; Oracle plus tard si déjà SI |
| **Oracle** | Non obligatoire en V1 | Brancher si source de vérité déjà existante |

### Principes non négociables

- Aucune donnée client / tarif / doc technique hors du réseau interne.
- Le LLM **ne calcule pas** et **n’invente pas** les prix.
- En cas de doute : répondre « à confirmer avec le bureau d’études / commercial ».

---

## 7. Contenu à préparer (données)

### Priorité haute

- Fiches produits Industrie (membrane, variantes, étanche, circuit, faces avant…)
- Contenus secteurs (médical, aéronautique, auto, etc.)
- Process clés (impression, découpe, assemblage, contrôle)
- Glossaire PIM

### Priorité moyenne

- Historiques anonymisés de projets / cas types
- FAQ commerciale existante
- Photos produits (pour phase image ultérieure)

### Qualité attendue

- Textes relus / validés métier
- Métadonnées : famille produit, secteur, contraintes (IP, tactile, éclairage…)
- Découpage clair pour l’indexation (pas de PDF scannés illisibles sans OCR)

---

## 8. Exigences fonctionnelles

| ID | Exigence | Priorité |
|----|----------|----------|
| F1 | L’utilisateur pose une question en langage naturel | Must |
| F2 | L’assistant reformule le besoin | Must |
| F3 | L’assistant propose 1 à 3 pistes produits / solutions | Must |
| F4 | L’assistant s’appuie sur des docs indexés (pas d’invention libre) | Must |
| F5 | L’assistant signale les limites / besoins de validation humaine | Must |
| F6 | Ouverture / fermeture du panneau chatbot | Must |
| F7 | Historique de conversation dans la session | Should |
| F8 | Suggestions de questions (chips) | Should |
| F9 | Export de la proposition (PDF / mail) | Could |
| F10 | Génération d’image | Won’t (V1) |

---

## 9. Exigences non fonctionnelles

| Thème | Exigence |
|-------|----------|
| Sécurité | Déploiement interne ; authentification entreprise |
| Confidentialité | Pas d’entraînement cloud sur données PIM |
| Performance | Réponse utile en quelques secondes (hors file GPU) |
| Disponibilité | Heures ouvrées en V1 acceptables |
| Journalisation | Logs d’usage (questions, sans stocker de secrets inutiles) |
| Langue | Français |

---

## 10. Organisation et livrables

### Phases

| Phase | Contenu | Livrable |
|-------|---------|----------|
| **0** | Infra + inventaire docs | Serveur prêt + liste des sources |
| **1** | Indexation Qdrant | Recherche documentaire validée |
| **2** | Agent LangGraph + Mistral + UI | Chatbot interne fonctionnel |
| **3** (hors V1) | Devis métier + images | Extensions |

### Rôles

| Rôle | Responsabilité |
|------|----------------|
| Sponsor métier | Priorités, validation des réponses |
| Référent produit / BE | Qualité des contenus techniques |
| Développeur / data | Agent, RAG, intégration UI |
| IT | Serveurs, réseau, accès, sauvegardes |

### Recette V1

- Jeu de 10 questions types (dont les 5 cas prioritaires)
- Revue métier des réponses
- Checklist sécurité IT (accès, logs, isolation réseau)
- Go / No-go pour usage interne élargi

---

## 11. Risques et garde-fous

| Risque | Mitigation |
|--------|------------|
| Hallucinations (fausse référence, fausse norme) | RAG obligatoire + refus si doc insuffisant |
| Mauvaise qualité des sources | Revue métier avant indexation |
| Attente d’un devis automatique | Hors scope V1 clairement communiqué |
| Surcharge GPU / lenteur | Dimensionner infra ; files d’attente |
| Contournement (usage client public trop tôt) | Accès interne seulement |

---

## 12. Budget / prérequis techniques (à chiffrer)

À estimer avec l’IT :

- 1 serveur avec GPU adapté au LLM (et marge pour phase image)
- Stockage pour Qdrant + documents
- Temps : préparation contenus + développement agent + recette
- Maintenance : mises à jour modèle, réindexation, support utilisateurs

---

## 13. Décision demandée

Validation de ce cahier des charges V1 pour lancer :

1. l’inventaire et la préparation des contenus prioritaires ;
2. le dimensionnement infra (GPU / réseau) ;
3. le développement de l’agent (LangGraph + Mistral + Qdrant) ;
4. le branchement de l’interface chatbot (maquette existante).

---

## 14. Annexes (à compléter)

- [ ] Liste des 20–50 documents prioritaires à indexer  
- [ ] Liste des 10 questions de recette  
- [ ] Schéma réseau / accès (IT)  
- [ ] Catalogue produits structuré (export)  
- [ ] Contact sponsor + référents métier  

---

*Document destiné à un usage interne PIM Industrie. Version V1 — draft.*
