import "./UsersTable.css";

export function UsersTable() {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Company</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Centro comercial Moctezuma</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Francisco Chang</td>
        <td>Mexico</td>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
      </tr>
    </table>
  );
}
