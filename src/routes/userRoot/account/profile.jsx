import { Paper, Box } from "@mui/material";

function Profile() {
  return (
    <div className="panel-settings">
      <div className="f2 fw3 mt6 mh5 mb3">Profile</div>
      <Box className="box-settings">
        <p className="f4 fw7 mt2 mb0 mh3">Cool feature #1</p>
        <p className="mt0 mh3 mb2">Additional info</p>
        <Paper elevation={3} />
      </Box>
      <Box className="box-settings">
        <p className="f4 fw7 mt2 mb2 mh3">Cool feature #2</p>
        <p className="mt0 mh3 mb2">Additional info</p>
        <div className="mh3 ">
          <button type="submit">
            <span>Hit a button</span>
          </button>
        </div>
        <Paper elevation={3} />
      </Box>
    </div>
  );
}

export default Profile;
