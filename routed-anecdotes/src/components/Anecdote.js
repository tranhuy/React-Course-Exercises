const Anecdote = ({ anecdote }) => {
   return (
       <div>
           <table>
               <tbody>
                   <tr><td><h3>{`${anecdote.content} by ${anecdote.author}`}</h3></td></tr>
                   <tr><td>{`has ${anecdote.votes} votes`}</td></tr>
                   <tr><td>for more info see <a href={anecdote.info}>{anecdote.info}</a></td></tr>
               </tbody>
           </table>
       </div>
   )
}

export default Anecdote