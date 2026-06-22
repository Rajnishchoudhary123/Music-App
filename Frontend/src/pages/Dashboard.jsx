import React, { useEffect } from 'react'
import { SongData } from '../Context/song'
import Layout from '../components/Layout'
import { UserData } from '../Context/user'
import { MdDelete } from 'react-icons/md'


const Dashboard = () => {

    const {dashboardStats , fetchDashboardStats} = SongData()

    const { users , fetchUsers , deleteUser ,user} = UserData();

    useEffect(()=>{

        fetchDashboardStats()

        fetchUsers()

    },[])

    console.log(users)
    
    const deleteUserHandler = (id)=>{

        if(confirm("are you sure you want to remove this user")){

            deleteUser(id)
        }

    }

  return (
   <Layout>
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div className="bg-zinc-900 p-5 rounded-xl shadow-lg border border-zinc-800">
        <h2 className="text-gray-400 text-sm">Total Songs</h2>
        <p className="text-3xl font-bold mt-2">
          {dashboardStats?.totalSong}
        </p>
      </div>

      <div className="bg-zinc-900 p-5 rounded-xl shadow-lg border border-zinc-800">
        <h2 className="text-gray-400 text-sm">Total Albums</h2>
        <p className="text-3xl font-bold mt-2">
          {dashboardStats?.totalAlbum}
        </p>
      </div>

      {user?.role === "admin" && (
        <>
          <div className="bg-zinc-900 p-5 rounded-xl shadow-lg border border-zinc-800">
            <h2 className="text-gray-400 text-sm">Premium Users</h2>
            <p className="text-3xl font-bold mt-2 text-yellow-400">
              {dashboardStats?.premiumUser}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl shadow-lg border border-zinc-800">
            <h2 className="text-gray-400 text-sm">Total Users</h2>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {dashboardStats?.totalUser}
            </p>
          </div>
        </>
      )}
    </div>

    {/* Users Section */}
    {user?.role === "admin" && (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Users</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {users?.map((user) => (
            <div
              key={user._id}
              className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 hover:border-zinc-600 transition"
            >
              <div className="mb-3">
                <h3 className="text-gray-400 text-sm">Name</h3>
                <p className="font-medium">{user.name}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-400 text-sm">Email</h3>
                <p className="text-sm break-all">{user.email}</p>
              </div>

              <button
                onClick={() => deleteUserHandler(user._id)}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
              >
                <MdDelete size={20} />
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</Layout>
  )
}

export default Dashboard