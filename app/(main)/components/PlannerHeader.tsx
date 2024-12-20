import React from "react";
import { View } from "react-native";
import { Typography } from "@/components/atoms";

const PlannerHeader: React.FC = () => {
  return (
    <View>
      <Typography fw="600" fz="fz14" font="Inter" lh={17} color="black">
        Saturday, 26 Aug
      </Typography>
      <Typography style={{marginTop: 4}} fw="700" fz="fz26" font="Inter" lh={28} color="primaryColor">
        Good Morning
      </Typography>
    </View>
  );
};

export default PlannerHeader
