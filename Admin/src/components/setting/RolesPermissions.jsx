import React from 'react';

const RolesPermissions = ({ users, setUsers, permissions, setPermissions }) => {
  const roles = ['Admin', 'Professor', 'Support'];
  const actions = Object.keys(permissions);

  const handleRoleChange = (userId, role) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role } : user)));
  };

  const handlePermissionChange = (action, role) => {
    setPermissions({
      ...permissions,
      [action]: {
        ...permissions[action],
        [role]: !permissions[action][role],
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Roles & Permissions</h2>

      {/* User List */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4">Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                >
                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-2 border rounded-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      aria-label="Role for ${user.name}"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Capabilities Matrix */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-4">Capability Matrix</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                {roles.map((role) => (
                  <th key={role} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {actions.map((action, index) => (
                <tr
                  key={action}
                  className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                >
                  <td className="px-4 py-4">{action}</td>
                  {roles.map((role) => (
                    <td key={role} className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={permissions[action][role]}
                        onChange={() => handlePermissionChange(action, role)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        aria-label="Toggle ${action} permission for ${role}"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;