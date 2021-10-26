var megadb = require('megadb');
class CaseManager {
    constructor(guildID){
        this.guildID = guildID;
        this.db = new megadb.crearDB(this.guildID, "cases");
        this.dbNotes = new megadb.crearDB(this.guildID, "casesNotes");
    }
    async getCases(filter = null){
        var db = this.db;
        var casesT = await db.values();
        var cases = casesT.filter(c => c.deleted == false);
        if(!filter){
           return cases;
        } else {
            if(filter.type){
                if(filter.user){
                    var validTypes = ["WARN", "KICK", "BAN", "MUTE"];
                    if(!validTypes.includes(filter.type)) return false;
                    var casesFiltered = cases.filter(c => c.punishmentType == filter.type && (c.targetUser == filter.user || c.executorUser == filter.user));
                    return casesFiltered;
                } else {
                    var validTypes = ["WARN", "KICK", "BAN", "MUTE"];
                    if(!validTypes.includes(filter.type)) return false;
                    var casesFiltered = cases.filter(c => c.punishmentType == filter.type);
                    return casesFiltered;
                }
            } else if(filter.user){
                var casesFiltered = cases.filter(c => c.targetUser == filter.user || c.executorUser == filter.user);
                return casesFiltered;  
            } else {
                return cases;
            }
        }
    }
    async getCase(id){
        var db = this.db;
        var db2 = this.dbNotes;
        var caseG = await db.get(`${id}`);
        if(!caseG || caseG.deleted == true) return false;
        var notesCases = await db2.values();
        var notesCase = notesCases.filter(nc => nc.caseID == caseG.id && nc.deleted == false);
        return {
            notes: notesCase,
            data: caseG,
            isLocked: caseG.locked
        };
    }
    addCase(executorID, executorTag, targetID, targetTag, type, reason){
        var db = this.db;
        var validTypes = ["WARN", "KICK", "BAN", "MUTE"];
        if(!validTypes.includes(type)) return false;
        var id = `${db.size()+1}`;
        db.set(id, {
            id,
            executorUser: executorID,
            executorUserTag: executorTag,
            targetUser: targetID,
            targetUserTag: targetTag,
            punishmentType: type,
            reason,
            locked: false,
            resolved: type == "KICK" ? true : false,
            deleted: false
        });
       return true;
    }
    async addCaseNote(id, note, noteAuthor){
        var db = this.db;
        var db2 = this.dbNotes;
        var caseG = await db.get(`${id}`);
        if(!caseG || caseG.deleted == true) return false;
        var notesCaseDB = await db2.values();
        var notesCase = notesCaseDB.filter(nc => nc.caseID == id && nc.deleted == false);
        var noteGID = `${db2.size()+1}`;
        var noteLID = `${notesCase.length+1}`;
        db2.set(noteGID, {
            id: noteGID,
            caseID: caseG.id,
            noteID: noteLID,
            note,
            author: noteAuthor,
            deleted: false
        });
        return true;
    }
    async deleteCase(id, resolve){
        var db = this.db;
        var db2 = this.dbNotes;
        var caseG = await db.get(`${id}`);
        if(!caseG || caseG.deleted == true) return false;
        var notesCaseDB = await db2.values();
        var notesCase = notesCaseDB.filter(nc => nc.caseID == caseG.id);
        if(resolve){
            db.set(`${caseG.id}.resolved`, true);
            return true;
        } else {
            for(var note of notesCase){
                db2.set(`${note.id}.deleted`, true);
            }
            db.set(`${caseG.id}.deleted`, true);
            return true;
        }

    }
    async removeCaseNote(id){
        var db = this.dbNotes;
        var caseNote = await db.get(`${id}`);
        if(!caseNote || caseNote.deleted == true) return false;
        db.set(`${caseNote.id}.deleted`, true);
    }
   async lock(id){
    var db = this.db;
    var caseG = await db.get(`${id}`);
    if(!caseG || caseG.deleted == true) return false;
    db.set(`${caseG.id}.locked`, true);
   }
   async unlock(id){
    var db = this.db;
    var caseG = await db.get(`${id}`);
    if(!caseG || caseG.deleted == true) return false;
    db.set(`${caseG.id}.locked`, false);
   }
}
module.exports = CaseManager;
