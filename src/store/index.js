import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputText: '',
    outputText: ''
  },
  mutations: {
    updateText (state, value) {
      state.inputText = value
    }
  },
  getters: {
    formatting (state) {
      state.outputText = ''
      var tmp = state.inputText.split(' ')
      /*
      var keyword = 'SELECT'
      */
      var keywords = {
        select: {value: 'SELECT', noBreakWords: ['TOP', 'DISTINCT']},
        from: {value: 'FROM', noBreakWords: []}
      }
      /*
      var keywords = ['ADD', 'EXTERNAL', 'PROCEDURE', 'ALL', 'FETCH', 'PUBLIC', 'ALTER', 'FILE', 'RAISERROR', 'AND', 'FILLFACTOR', 'READ', 'ANY',
        'FOR', 'READTEXT', 'AS', 'FOREIGN', 'RECONFIGURE', 'ASC', 'FREETEXT', 'REFERENCES', 'AUTHORIZATION', 'FREETEXTTABLE', 'REPLICATION', 'BACKUP', 'FROM',
        'RESTORE', 'BEGIN', 'FULL', 'RESTRICT', 'BETWEEN', 'FUNCTION', 'RETURN', 'BREAK', 'GOTO', 'REVERT', 'BROWSE', 'GRANT', 'REVOKE', 'BULK', 'GROUP', 'RIGHT',
        'BY', 'HAVING', 'ROLLBACK', 'CASCADE', 'HOLDLOCK', 'ROWCOUNT', 'CASE', 'IDENTITY', 'ROWGUIDCOL', 'CHECK', 'IDENTITY_INSERT', 'RULE', 'CHECKPOINT',
        'IDENTITYCOL', 'SAVE', 'CLOSE', 'IF', 'SCHEMA', 'CLUSTERED', 'IN', 'SECURITYAUDIT', 'COALESCE', 'INDEX', 'SELECT', 'COLLATE', 'INNER',
        'SEMANTICKEYPHRASETABLE', 'COLUMN', 'INSERT', 'SEMANTICSIMILARITYDETAILSTABLE', 'COMMIT', 'INTERSECT', 'SEMANTICSIMILARITYTABLE',
        'COMPUTE', 'INTO', 'SESSION_USER', 'CONSTRAINT', 'IS', 'SET', 'CONTAINS', 'JOIN', 'SETUSER', 'CONTAINSTABLE', 'KEY', 'SHUTDOWN', 'CONTINUE', 'KILL', 'SOME',
        'CONVERT', 'LEFT', 'STATISTICS', 'CREATE', 'LIKE', 'SYSTEM_USER', 'CROSS', 'LINENO', 'TABLE', 'CURRENT', 'LOAD', 'TABLESAMPLE', 'CURRENT_DATE', 'MERGE',
        'TEXTSIZE', 'CURRENT_TIME', 'NATIONAL', 'THEN', 'CURRENT_TIMESTAMP', 'NOCHECK', 'TO', 'CURRENT_USER', 'NONCLUSTERED', 'TOP', 'CURSOR', 'NOT', 'TRAN',
        'DATABASE', 'NULL', 'TRANSACTION', 'DBCC', 'NULLIF', 'TRIGGER', 'DEALLOCATE', 'OF', 'TRUNCATE', 'DECLARE', 'OFF', 'TRY_CONVERT', 'DEFAULT', 'OFFSETS',
        'TSEQUAL', 'Del', 'ON', 'UNION', 'DENY', 'OPEN', 'UNIQUE', 'DESC', 'OPENDATASOURCE', 'UNPIVOT', 'DISK', 'OPENQUERY', 'UPDATE', 'DISTINCT', 'OPENROWSET',
        'UPDATETEXT', 'DISTRIBUTED', 'OPENXML', 'USE', 'DOUBLE', 'OPTION', 'USER', 'DROP', 'OR', 'VALUES', 'DUMP', 'ORDER', 'VARYING', 'ELSE', 'OUTER', 'VIEW', 'END',
        'OVER', 'WAITFOR', 'ERRLVL', 'PERCENT', 'WHEN', 'ESCAPE', 'PIVOT', 'WHERE', 'EXCEPT', 'PLAN', 'WHILE', 'EXEC', 'PRECISION', 'WITH', 'EXECUTE', 'PRIMARY',
        'WITHIN', 'GROUP', 'EXISTS', 'PRINT', 'WRITETEXT', 'EXIT', 'PROC', ',']
      */
      /*
      var lfPosition = tmp.filter((value, index, array) => {
        return value === keyword
      })
      console.log(lfPosition)
      */
      tmp.forEach((value, index, array) => {
        state.outputText = state.outputText + value + ' '
        for (let keyword of Object.keys(keywords)) {
          console.log(keywords[keyword])
          if (value === keywords[keyword].value) {
            state.outputText = state.outputText + '\n'
            break
          }
        }
      })
      return state.outputText
    },
    getInputText (state) {
      return state.inputText
    }
  },
  modules: {
  }
})
