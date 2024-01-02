import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  RefreshControlComponent,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { dummyDataDetails } from "../../constants/dummyData";

// I use dummyData because API calls are spent

const tabs = ["About", "Qualifications", "Responsibilities"];

function JobDetails() {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const { data, isLoading, refetch, error } = useFetch("job-details", {
    job_id: params.id,
  });

  // const isLoading = false;
  // const error = false;
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {};

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics title="Qualifications" points={["NA"]} />;
      case "About":
        return <JobAbout info={"No data provided"} />;
      case "Responsibilities":
        return <Specifics title="Responsibilities" points={["NA"]} />
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimensions="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimensions="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : dummyDataDetails.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              {dummyDataDetails.map((company) => (
                <Company
                  key={company.job_id}
                  companyLogo={company.employer_logo}
                  jobTitle={company.job_title}
                  companyName={company.employer_name}
                  location={company.job_country}
                />
              ))}

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={'https://careers.google.com/jobs/results'}/>
      </>
    </SafeAreaView>
  );
}

export default JobDetails;
