# CaseManager.js
CaseManager.js is an open-source dynamic tool that is expected to help people with their punishments commands with Discord.js

This tool requires:
- Discord.js (v13^ recommended)
- megadb

You probably are asking for what is this lib?

CaseManager.js was created for making easier the management of cases, so let's see how it works

Documentation:

Constructor:

```js
 new CaseManager(guildID);
 // Example:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var Manager = new CaseManager(guild.id);
```
------------------------------------------
CaseManager#guildID:

Basically returns the guildID specified in the constructor, this is almost useless, but its used in the base code of the lib.
```js
CaseManager.guildID;
// Example:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var Manager = new CaseManager(guild.id);
 console.log(Manager.guildID); // Returns 862326061408059424
```
------------------------------------------
CaseManager#db

Returns the megadb database instance that was created basing on guild ID.
```js
CaseManager.db
```
------------------------------------------
CaseManager#getCases

Returns all cases (filtered if a filter is given)
```js
CaseManager.getCases([filter]);
// Filter Usage:
[filter] = { type: "punishment_type_to_filter", user: "user_id_to_filter" }
// Example 1:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var user = /* User Reference */;
 var Manager = new CaseManager(guild.id);
 var user_cases = await Manager.getCases({user: user.id}); // Returns an array with filtered cases
// Example 2:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var Manager = new CaseManager(guild.id);
 var bans = await Manager.getCases({type:"BAN"}); // Returns an array with filtered cases
// Example 3:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var Manager = new CaseManager(guild.id);
 var all_cases = await Manager.getCases(); // Returns an array with all the cases
 ```
------------------------------------------
CaseManager#getCase

Returns the case with the ID specified, if the case doesn't exist, then returns `false`
```js
CaseManager.getCase(CaseID);
// Example 1:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var case_id = "44";
 var Manager = new CaseManager(guild.id);
 var finalcase = await Manager.getCase(case_id); // Returns the Case object
// Example 2:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var case_id = "4225";
 var Manager = new CaseManager(guild.id);
 var finalcase = await Manager.getCase(case_id); // Returns false
```
------------------------------------------
CaseManager#addCase

Creates a new Case and registers it in the databasew
```js
CaseManager.addCase(executorID, executorTag, targetID, targetTag, type, reason, punishmentID);
/* Args
executorID: the ID of the user that gives the punishment
executorTag: the Discord tag of the user that gives the punishment
targetID: the ID of the user that gets punished
targetTag: the Discord tag of the user that gets punished
type: the type of punishment, you can find them at the top
reason: the reason of the punishment
punishmentID: If the punishment saves in somewhere else than as cases, you can save ID here, this arg is OPTIONAL
*/
// Example:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var executor = /* User Reference */;
 var target = /* User Reference */;
 var reason = "Staff Disrespect";
 var muteid = "423";
 var Manager = new CaseManager(guild.id);
 Manager.addCase(executor.id, executor.tag, target.id, target.tag, "MUTE", reason, muteid); // Returns true
```
------------------------------------------
CaseManager#addCaseNote

Adds a note to the case
```js
CaseManager.addCaseNote(id, note, noteAuthor);
/* Args
id: ID of the Case
note: The content of the note
noteAuthor: the user ID that adds the note
*/
// Example:
 var CaseManager = require('./CaseManager.js');
 var guild = /* Guild Reference */;
 var user = /* User Reference */;
 var note = "This user also harassed the owner, the server and almost every staff online.";
 var caseid = "51";
 var Manager = new CaseManager(guild.id);
 Manager.addCaseNote(caseid, note, user.id); // Returns true
