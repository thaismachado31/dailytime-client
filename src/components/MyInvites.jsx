import React, { useEffect, useState } from "react";
import InviteList from "../components/InviteList";
import api from "../apis/api";

const MyInvites = () => {
  const [invites, setInvites] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function getInvites() {
    try {
      // /eventinvites/629b9859ef51fb2688f9c0b9
      // /eventinvites/62a4c4a6946c8247c4060d31
      // /myinvites
      const myinvites = await api.get(`/eventinvites/62a4c4a6946c8247c4060d31`);
      setInvites(myinvites.data);
    } catch (error) {}
  }

  const deleteInvite = async (_id) => {
    try {
      const response = await api.delete(`/invite/${_id}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptInvite = async (_id) => {
    try {
      const response = await api.patch(`/invite/${_id}`, { confirmacao: true });
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvites();
  }, [refresh]);

  console.log(invites);

  return (
    <div className="text-center">
      {" "}
      <InviteList
        list={invites}
        title="My Invites"
        functions={{ deleteInvite, acceptInvite }}
      />{" "}
    </div>
  );
};

export default MyInvites;