import React, { useEffect, useState } from "react";
import InviteList from "../invites/InviteList";
import api from "../../apis/api";

const MyInvites = (props) => {
  const [invites, setInvites] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { height } = props;

  async function getInvites() {
    try {
      const myinvites = await api.get(props.route);
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

  return (
    <div
      className="text-center"
      style={{ height: `${height}vh`, overflow: `auto` }}
    >
      <InviteList
        isAnEvent={props.isAnEvent}
        list={invites}
        title={" " || "My Invites"}
        functions={{ deleteInvite, acceptInvite }}
      />{" "}
    </div>
  );
};

export default MyInvites;
