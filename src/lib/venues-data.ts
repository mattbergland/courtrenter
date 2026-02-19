import { Venue, Sport } from "@/types/venue";
import { supabase } from "./supabase";

const VALID_SPORTS: Sport[] = ["basketball"];

const seedVenues: Venue[] = [
  {
    id: "kezar-pavilion",
    name: "Kezar Pavilion",
    address: "755 Stanyan St, San Francisco, CA 94117",
    neighborhood: "Haight-Ashbury",
    sports: ["basketball"],
    description: "Historic indoor gym in Golden Gate Park with full-size basketball courts. Popular for leagues and pickup games. Available for private rentals.",
    priceRange: "$75-150/hr",
    phone: "(415) 831-2774",
    website: "https://sfrecpark.org/facilities/facility/details/Kezar-Pavilion-702",
    indoor: true,
    courtCount: 2,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerAuBA2qwNgRWJqBLF-Y3PKKHihv_zRwgjrDjvPEbRmX8IcfK5ra_b891YWYteCkPcvsZegE3_gMpkKn5hIPAh3TmMCPZ-FUxBGV5YLOsNyEpGp-nfK6u2dAJm8dN_e3StN859G=w800-h600-k-no",
  },
  {
    id: "mission-rec-center",
    name: "Mission Recreation Center",
    address: "2450 Harrison St, San Francisco, CA 94110",
    neighborhood: "Mission District",
    sports: ["basketball"],
    description: "Community rec center with indoor gymnasium. Great for basketball rentals and private events.",
    priceRange: "$50-100/hr",
    phone: "(415) 695-5012",
    website: "https://sfrecpark.org/facilities/facility/details/Mission-Recreation-Center-525",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqGnZdlb7iggRskU0TE4P4pt2ocThzrT2jfJG8M0esMeO6c5p6u1Y8JoQYgncgLuPlxdCOUr7MFk23TzLwcZrk0KgstGTvg332Z52ktG3LSoDtshEsC9e4My4Nva8rlt-twJFjYKQ=w800-h600-k-no",
  },
  {
    id: "hamilton-rec-center",
    name: "Hamilton Recreation Center",
    address: "1900 Geary Blvd, San Francisco, CA 94115",
    neighborhood: "Western Addition",
    sports: ["basketball"],
    description: "Well-maintained indoor basketball court in the Western Addition. Ideal for team practices, birthday parties, and corporate events.",
    priceRange: "$50-100/hr",
    phone: "(415) 292-2008",
    website: "https://sfrecpark.org/facilities/facility/details/Hamilton-Recreation-Center-440",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqNuvoLSK46ty-Qhc2E580sdZfQIWR8gATvxgluGqdofppGI-3xn0AxjHfVTlqCElP_NBXXnXK0Urmg-dsEw5Xd-HSpz9WsU82yBrmrU4jDNhtliT40BfUCm-nC5x6KzIoZU_8=w800-h600-k-no",
  },
  {
    id: "potrero-hill-rec",
    name: "Potrero Hill Recreation Center",
    address: "801 Arkansas St, San Francisco, CA 94107",
    neighborhood: "Potrero Hill",
    sports: ["basketball"],
    description: "Indoor gym with panoramic city views. Great neighborhood facility for basketball court rentals.",
    priceRange: "$40-80/hr",
    phone: "(415) 695-5009",
    website: "https://sfrecpark.org/facilities/facility/details/Potrero-Hill-Recreation-Center-555",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwercjiPgavwgU8iHMWNPzV0wUKMBPN9Up0fiW1-oKl-zh-gKCyRqUyjVlP9jvm0VZn8WlZZzXzruMV9oGV_8y609Edp77AR47fsg_FoSDTGtg-0JYdOQmLUvz3no-8CMmHd8dg1R=w800-h600-k-no",
  },
  {
    id: "moscone-rec-center",
    name: "Moscone Recreation Center",
    address: "1800 Chestnut St, San Francisco, CA 94123",
    neighborhood: "Marina",
    sports: ["basketball"],
    description: "Popular Marina district facility with indoor basketball courts. Walking distance from Chestnut Street shops.",
    priceRange: "$50-100/hr",
    phone: "(415) 292-2006",
    website: "https://sfrecpark.org/facilities/facility/details/Moscone-Recreation-Center-530",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqbA3C45-GgfSvBdlDe6-G2ULh0OfZ0eVldzAvDBjfQVdRdp-_W21y-mnisbVpWKnbMDj4JFcG6MIRX7gNGVMsxTregdw2OdTzMsRjmtXPqcoULEbGiVo7dHvFM_Krt9Naqsu9Rfw=w408-h544-k-no",
  },
  {
    id: "sunset-rec-center",
    name: "Sunset Recreation Center",
    address: "2201 Lawton St, San Francisco, CA 94122",
    neighborhood: "Sunset",
    sports: ["basketball"],
    description: "Spacious indoor gym in the Sunset with basketball courts. Family-friendly facility with ample parking nearby.",
    priceRange: "$40-80/hr",
    phone: "(415) 753-7098",
    website: "https://sfrecpark.org/facilities/facility/details/Sunset-Recreation-Center-596",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqxEjklGHUXCIoJb2cky1YfhG5AjMa8_FbY9qmi3Ne317ckOWHYUrmENuxmkOBA7vqnMOPle8VGsM-CCv_x0jwBxNacvcTMmjz5FPTjVVqx-iQeLnpX4XxZdHDLkAgCE_72i97j=w408-h544-k-no",
  },
  {
    id: "glen-park-rec",
    name: "Glen Park Recreation Center",
    address: "70 Elk St, San Francisco, CA 94131",
    neighborhood: "Glen Park",
    sports: ["basketball"],
    description: "Neighborhood rec center with indoor basketball court. Quiet area, easy BART access from Glen Park station.",
    priceRange: "$40-80/hr",
    phone: "(415) 239-4514",
    website: "https://sfrecpark.org/facilities/facility/details/Glen-Park-Recreation-Center-430",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer8hTzkcvPmc2RdLKqazewVs_TF1rCVTxHSGNneLSCLr2E-YpsuXlcmotpM2nxkz__ZgALkrOn8lpNUDMuOS3FNTb8j_mIs8U8wBuJuoG1bq52Ztttze-VtErKNqETfGseJh4DqmA=w408-h307-k-no",
  },
  {
    id: "joe-lee-rec",
    name: "Joe Lee Recreation Center",
    address: "1395 Mendell St, San Francisco, CA 94124",
    neighborhood: "Bayview-Hunters Point",
    sports: ["basketball"],
    description: "Community-focused gym in Bayview with a full-size indoor basketball court. Affordable rates for private rentals and group events.",
    priceRange: "$35-70/hr",
    phone: "(415) 822-4660",
    website: "https://sfrecpark.org/facilities/facility/details/Joe-Lee-Recreation-Center-494",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepTlTP-qfDNA4o1XrFoWtAAOz0DB-2b_jU5ZWJ7bd0qdVCOkdYfQw-Ag7evmVPkahcYNGXCQuiv0NLNX4S3ZOd4vlsnEci6IbMvMq1E40x65QilXTw72iJauIJOzuYmcp2cxlL3SQ=w800-h600-k-no",
  },
  {
    id: "balboa-pool-gym",
    name: "Balboa Park Gymnasium",
    address: "60 San Jose Ave, San Francisco, CA 94110",
    neighborhood: "Excelsior",
    sports: ["basketball"],
    description: "Large indoor gymnasium adjacent to Balboa Park. Multiple courts available for basketball.",
    priceRange: "$50-100/hr",
    phone: "(415) 337-4705",
    website: "https://sfrecpark.org/facilities/facility/details/Balboa-Park-395",
    indoor: true,
    courtCount: 2,
  },
  {
    id: "garfield-square",
    name: "Garfield Square Recreation Center",
    address: "1197 26th St, San Francisco, CA 94107",
    neighborhood: "Mission District",
    sports: ["basketball"],
    description: "Active community facility with indoor basketball court. Bilingual staff.",
    priceRange: "$40-80/hr",
    phone: "(415) 695-5006",
    website: "https://sfrecpark.org/facilities/facility/details/Garfield-Square-427",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqybrn7C96VORZUiuqxXoCMCEpuiYWa5FOrhivZm88ccAxeNIVm5DF3jiH-MrIknO1FXvkItucW2AGMK-_Sq2ulxaskCEcqCDs9jTGV8OG4CXgOTlfSAhgF6gvR1ITTzOj0KLmCQw=w800-h600-k-no",
  },
  {
    id: "crocker-amazon-fields",
    name: "Crocker Amazon Playground & Fields",
    address: "799 Moscow St, San Francisco, CA 94112",
    neighborhood: "Excelsior",
    sports: ["basketball"],
    description: "Large outdoor basketball courts. One of the best outdoor facilities in the city.",
    priceRange: "$50-150/hr",
    phone: "(415) 337-4704",
    website: "https://sfrecpark.org/facilities/facility/details/Crocker-Amazon-Playground-411",
    indoor: false,
    courtCount: 4,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerob8eBCMYagYtqTnLt52sjQ-N99X8RudPRCegw08vvOftpkyLBZnqe4OqUNvEwtuQXh5MEkrs-OJzSQZwA9hOMhXOT3lINJTZqduCv9YX0qYsNbXmYhayQJZmxN4ePnfPF7iyd=w800-h600-k-no",
  },
  {
    id: "alameda-point-gymnasium",
    name: "Alameda Point Gymnasium",
    address: "1101 W Redline Ave, Alameda, CA",
    neighborhood: "Alameda",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6AtYFrCzaACH1CmIHCl8Z6ZM3Oh8NIILYjPyct3RaBy3-o7kvIQXqHO9xaYZbyKvFT1cETA9sznzX9iq_Oj8JO_F0TlrFFpKM7hUffrpKsLMV5ezLdeeSY07MLCVlmqclp680TA=w408-h304-k-no",
  },
  {
    id: "almaden-community-center",
    name: "Almaden Community Center",
    address: "6445 Camden Ave, San Jose, CA",
    neighborhood: "San Jose",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepfa9lDq9_KqGgVPjOS3av9K8OFvPLfZEdE3W1-LwEYL9E1dRcQSTOj6IrwVGOMtsCmLDEXR7Y0bdrN3tiTOBEBMT6EbqeFh_4R0iOqu2Z-qvQ_U1dkIi3ZY1a4dvbIjiYL_oSP=w800-h600-k-no",
  },
  {
    id: "arrillaga-family-gymnasium",
    name: "Arrillaga Family Gymnasium",
    address: "600 Alma St, Menlo Park, CA",
    neighborhood: "Menlo Park",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqdwBqcr8Eu3jOJgLIMm2LPUX9g4BtM6r0y2MlHKwL2w4Lq5Emm4dcXlYzeZTmXqUtXge3b-JHK9sGgQAZTiEYXZsRh3YMhALdGsrJe_sJ1tR1SwFjhNRFEboFN3BkoBUzCqAIr=w800-h600-k-no",
  },
  {
    id: "arrillaga-outdoor-education-and-rec-center-gym",
    name: "Arrillaga Outdoor Education and Rec Center Gym",
    address: "285 Santa Teresa St, Stanford, CA",
    neighborhood: "Stanford",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMzAhdGmBJEHWqdx8rAfNraJKIagTHQTWPoxDz1=w800-h600-k-no",
  },
  {
    id: "bay-city-basketball-hq",
    name: "Bay City Basketball HQ",
    address: "4550 Geary Blvd, San Francisco, CA",
    neighborhood: "Richmond",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMtXM1PJromcZcJgu5PzeQFva6k0_qEnkEydvGt=w408-h305-k-no",
  },
  {
    id: "bayshore-community-center",
    name: "Bayshore Community Center",
    address: "450 Martin St, Daly City, CA",
    neighborhood: "Daly City",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerJGcl0oG120fnTReZ5Tj7RG_rnx0X6ym1_9mwwC7g1NbGahywgFaEP4hHxW6ArwohJUxH0lMkC-Pp-s8ltx2bl0iqhS8S7_JbbPLGJaiOVPz-bOvIlCp3T1hgiHTX5emjmttC8=w800-h600-k-no",
  },
  {
    id: "boys-and-girls-club-coastside",
    name: "Boys and Girls Club of The Coastside Events Center",
    address: "530 Kelly Ave, Half Moon Bay, CA",
    neighborhood: "Half Moon Bay",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqUShK37IbMs4HIgKPD9u1Eb0UDk5MVdcjicaYBkAgRvBJo2n_tvZghhkTywz8tauKkx1NAc-tLQ-qB7VK3QPPGxAYP1-YYS_dbioqrMBB7COYEz6CHIC87VOcEBA8ZfbeulLOT=w800-h600-k-no",
  },
  {
    id: "buddhist-church-of-san-francisco",
    name: "Buddhist Church of San Francisco",
    address: "1881 Pine Street, San Francisco, CA",
    neighborhood: "Pacific Heights",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepnVBfQL5b7FqcJVJFC9A-oEcFwNmig7sPAYy0gcxWaUebaT9ClsZto35vX9rf4vve0P2WiSMjAZXwj3PCu33GPhMI8y5_IpMr1-8PnVfIE21tDHOk6By_-9--y1L1tdkCm1ZacAw=w408-h541-k-no",
  },
  {
    id: "calvary-church-los-gatos",
    name: "Calvary Church Los Gatos",
    address: "16330 Los Gatos Blvd, Los Gatos, CA",
    neighborhood: "Los Gatos",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipM3Ui4gKZkqIwQQFH3qcP05MeTxNC9zMGXVORCB=w408-h298-k-no",
  },
  {
    id: "camden-community-center",
    name: "Camden Community Center",
    address: "3369 Union Ave, San Jose, CA",
    neighborhood: "San Jose",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqQAEvtx3MjtegrZsWuFRKP2pZtnJ9aygP2EWvGyrFqXmY_GrwAZPH7EKbbICxkC_-ql9kCdj260VehI64K5k0Jbln2n3z5aTXrM64NVoD6fDKp56ofVftJDd_44TFdDJjS1-Sp6g=w408-h305-k-no",
  },
  {
    id: "campbell-community-center-main-gym",
    name: "Campbell Community Center Main Gym",
    address: "1 W Campbell Ave, Campbell, CA",
    neighborhood: "Campbell",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepofpsP4WKQQlxGs8wzYQO4DLD2rB_WUqd5vz4YNzjEQNE-gAjQZZQGCOEQ58sI8wjJ5BiT22DtRW8MLs7xUa-poHEZl12c-VYgvL1ff73q_D9FwONB1HthWAbzHo-gvVZlXKQ2=w800-h600-k-no",
  },
  {
    id: "del-mar-middle-school-gymnasium",
    name: "Del Mar Middle School Gymnasium",
    address: "105 Avenida Miraflores, Tiburon, CA",
    neighborhood: "Tiburon",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep0-nSbzXqAI-WOGp5i8a3bPTn5cgHEk4gXR-wDQSeXLpmMw6g8_cNY_naKYTQ3KpsgbwjaPFFH1K1ihe0ShOyey0QcUEMxZ8DHv1YHwuNjaRf_xZu5VQEUy6EKYTCGqDAUSx8LdQ=w800-h600-k-no",
  },
  {
    id: "egan-junior-high-school",
    name: "Egan Junior High School",
    address: "100 W. Portola Ave, Los Altos, CA",
    neighborhood: "Los Altos",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer0Z2R4kQrqQMqozQ8FeHwNYYb8_JNGeWkKVtwud1VljnS9S924-SLQOd-txaSUjbuEggxd2os_wkWSMvUQDpGEJa7gL_xHPspCL9CDTjMyidD5l-bfkyt-MSIGelTdxc7v719D=w408-h302-k-no",
  },
  {
    id: "emeryville-center-of-community-life-gymnasium",
    name: "Emeryville Center of Community Life Gymnasium",
    address: "1100 47th St, Emeryville, CA",
    neighborhood: "Emeryville",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "house-of-hustle",
    name: "House of Hustle",
    address: "3532 Arden Road, Hayward, CA",
    neighborhood: "Hayward",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=iL2-XDd19nNKNUqth3bwIA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=128.06967&pitch=0&thumbfov=100",
  },
  {
    id: "ica-cristo-rey-academy",
    name: "ICA Cristo Rey Academy",
    address: "315 Fair Oaks St, San Francisco, CA",
    neighborhood: "Mission District",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipPgdubP2f41eOvG7npHmJ-25Dc71nPLigdaMMEj=w408-h272-k-no",
  },
  {
    id: "irvington-community-center",
    name: "Irvington Community Center",
    address: "41885 Blacow Rd, Fremont, CA",
    neighborhood: "Fremont",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwergjSyDBAQSP37jnYooJOBHZfYxEKPOvmrwU-VUuhK11aQx5E1SUT9UyF9SxCXjIHFxIcBJxxkId6yhpH_7QnineZ_xj7cmEb4m_UTU-gcp32VU6BSeWODDNjvPK6rgfhZgzKZAQg=w800-h600-k-no",
  },
  {
    id: "james-kenney-community-center",
    name: "James Kenney Community Center",
    address: "1720 Eighth St, Berkeley, CA",
    neighborhood: "Berkeley",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqyvdg40KoIKenPhKilWxCoqWlcaIgRwUUnh0cN2ZwxVYd-2lj-GMiYECmb7bXZwJ9CyU9pRD0K9F1SCWhuGKY9w0hb13oZiYI9ut0LWYovNLEBV6IEVA_5YNjEi0r3MouRtXaY1g=w800-h600-k-no",
  },
  {
    id: "jewish-community-center-of-san-francisco",
    name: "Jewish Community Center of San Francisco",
    address: "3200 California St, San Francisco, CA",
    neighborhood: "Presidio Heights",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOFgIrdaps0W68wiuAOZZXU21-m16m7-c-PZaM=w800-h600-k-no",
  },
  {
    id: "king-community-center",
    name: "King Community Center",
    address: "725 Monte Diablo Ave, San Mateo, CA",
    neighborhood: "San Mateo",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "mlk-jr-youth-services-center",
    name: "MLK Jr. Youth Services Center",
    address: "1730 Oregon St, Berkeley, CA",
    neighborhood: "Berkeley",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=cYrrrkGmHPURw44eAoHchg&cb_client=search.gws-prod.gps&w=408&h=240&yaw=233.17432&pitch=0&thumbfov=100",
  },
  {
    id: "marina-middle-school",
    name: "Marina Middle School",
    address: "3500 Fillmore St, San Francisco, CA",
    neighborhood: "Marina",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqvZ9pFQU22liezXr4llJE5yODlFrjCwvnPEHCeFKvYvIh9DJ9CANriCGfhJe7QJ2XjjXvHjnwHgZ42H0Dqv2zC21EACze2qKsL8q5U6ZWSkN22bvk8CB9Vge6IhGzU3kOzGTaW=w408-h725-k-no",
  },
  {
    id: "mark-green-sports-center",
    name: "Mark Green Sports Center",
    address: "31224 Union City Blvd, Union City, CA",
    neighborhood: "Union City",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqe7mk4A5X8dtLhd6ihbA74n1SjEWYcctDtI10W9Ck_rf-0Pd1YCOuLkg65_4m5hq1VtdZDF7TqdUicuBTYg0UiSnFw3f0CXtF826AL3BWyMXxv7F0fG9-1zuFcH-NfvHfsmDgfig=w800-h600-k-no",
  },
  {
    id: "milpitas-sports-center-gymnasium",
    name: "Milpitas Sports Center Gymnasium",
    address: "1325 E Calaveras Blvd, Milpitas, CA",
    neighborhood: "Milpitas",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepktImjeLRGb5ipYZ8MnEtC1K3qLNa8qC8N7qm_WjwLQ_i2QlbCj4KBZotSl_S3Si8hZKxPfP-0ddzADr4hZTIr-mrtc67JPkJHAZG5wyQNm5NG80PW0Y0mgOXuNZ4R1M_Jcf3_yW3iYao=w408-h408-k-no",
  },
  {
    id: "mission-dolores-academy",
    name: "Mission Dolores Academy",
    address: "3371 16th Street, San Francisco, CA",
    neighborhood: "Mission District",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepRxK_q60Ld9KHWovmOqpA-JKQ66irrXaIXPeJFg_20CMDynqzhZsS914y0dlmbdZzL49R1YmMjX_ggGXPkNsrb0L322b-7GyW3WckVfkqUC57-YdEc6QMsPuPd5T1C6CIY_sQ=w408-h271-k-no",
  },
  {
    id: "oakland-ymca",
    name: "Oakland YMCA",
    address: "2350 Broadway, Oakland, CA",
    neighborhood: "Oakland",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqR3CyURGHlEXRL_iz84DGjeqoFWcRLx75nHW0ZOGGdYvlbD9bft1bOzOOjJTgQU_jy9W-IfXAT79EEqDGHzPYm5tflj91019Rc-NIpB7_H1bh7tTN-5sXJG4U8xCv-tc9yX0MxKA=w408-h544-k-no",
  },
  {
    id: "presidio-community-ymca",
    name: "Presidio Community YMCA - Main Post Gymnasium",
    address: "63 Funston Avenue, San Francisco, CA",
    neighborhood: "Presidio",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipP8MpiWy6EVHdUmuJu6Wu1FaZBvrw8ovlaejVRN=w408-h271-k-no",
  },
  {
    id: "red-morton-community-center",
    name: "Red Morton Community Center",
    address: "1120 Roosevelt Ave, Redwood City, CA",
    neighborhood: "Redwood City",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqZCPzDk-03NdEGVO6GvzY1QlVmkdTWHZn2cn6_dIRIQPtL1L1aek4IKazZtANC3LbUcCnLo6rkzsPE1j8uEaZBN5pUjk4HmX1wNLdON-XYbJJ8g2KuDJbqX9GWueNppJbJogrK=w800-h600-k-no",
  },
  {
    id: "sf-international-hs",
    name: "SF International HS",
    address: "655 De Haro St, San Francisco, CA",
    neighborhood: "Potrero Hill",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoqQopp8wt4mpskpVwXcDejFEVPySGfYBfXP62DPERU4w8GYMVM4kdgCFGBiPQbYopf8MDLa2YLfwfijVY26Np5B-PDXhfeSkMH5MtdJWg9cjxXwHpqZJbWrg5vfJpRbRg9ds2b=w408-h544-k-no",
  },
  {
    id: "salvation-army-kroc-center",
    name: "Salvation Army KROC Center",
    address: "240 Turk Street, San Francisco, CA",
    neighborhood: "Tenderloin",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqg7Knanm2qGf5v8fWIGMfbeOvddKB2aMzUDzwvo77thMpMJKD-ErHB5P6sFo6FVSqsulJP7M4d8YpkJzOqEEtgf3LLx0UkpmMyK0smBMQu8xs0WbDyYDw7jfnyyhRAxiuiybN4hA=w800-h600-k-no",
  },
  {
    id: "san-carlos-youth-center",
    name: "San Carlos Youth Center",
    address: "1001 Chestnut St, San Carlos, CA",
    neighborhood: "San Carlos",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoD2xvbpN2qQC_H0TWb6I4qFgOdco2_LAkcQtM938ew1bNAImkwslR4PKr40uWWiz2IAIaaOwNdIHvto-l99XhrpzLOwY8Yx6QSahtDANsaAia5X4GOl8ZBuuWMVEAz5My5kuWp=w408-h906-k-no",
  },
  {
    id: "seven-trees-community-center",
    name: "Seven Trees Community Center",
    address: "3590 Cas Dr, San Jose, CA",
    neighborhood: "San Jose",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwertWzHGp5OUZ-n-I5_pORvLf3Q8wyPGOsHl_86ZteayWHoo7JGOyQFCASxrNguwtxTIRKV7WZnhjloC579kWBubJRpCK3OZWLLNWyHESxFb-r_w8MYE9W2fndJhcmWmlp5rKJ5-7URo7EFZ=w800-h600-k-no",
  },
  {
    id: "silliman-activity-center-gymnasium",
    name: "Silliman Activity Center Gymnasium",
    address: "6800 Mowry Ave, Newark, CA",
    neighborhood: "Newark",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
  },
  {
    id: "sportshouse-gym",
    name: "Sportshouse Gym",
    address: "3151 Edison Way, Redwood City, CA",
    neighborhood: "Redwood City",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMbcbyJcEXOHQtPvkX4x-TkolDeFnnsgWluGzyi=w408-h271-k-no",
  },
  {
    id: "tel-hi-neighborhood-center",
    name: "Tel Hi Neighborhood Center",
    address: "555 Chestnut Street, San Francisco, CA",
    neighborhood: "North Beach",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer8OrBnEo7EG9yGDuAVunxZI7XAKn9fGfjRF1LRGPtEEkyVJ1M57CB8cdTLXN9Pn0xnsWkfathrqoItP-ai9wsLFqazlaL-5FT6jofRCSUGuSuxPmm8-YlFTZ_DTeZwG7M87TDK2g=w800-h600-k-no",
  },
  {
    id: "the-club-at-city-center",
    name: "The Club at City Center",
    address: "1200 Clay St #100, Oakland, CA",
    neighborhood: "Oakland",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepEnDE31aUq1j2guiHSDj1RNumuUjiHcqLa8a-mtRCucrJgKgjzAyhtFhMtmRccUw9wnDfooFdLZNWZ8Z1q-IZ6-zlT75v1uF3MXWEI_51z9sUOCENcHUHtnfYfgznBjNZbUWdD=w800-h600-k-no",
  },
  {
    id: "ultimate-fieldhouse",
    name: "Ultimate Fieldhouse",
    address: "2675 Mitchell Drive, Walnut Creek, CA",
    neighborhood: "Walnut Creek",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipMhsmTQk4lFhIvLqpPpQcrgSeZTrf52HKahdr_a=w408-h272-k-no",
  },
  {
    id: "villa-sport-athletic-club-san-jose",
    name: "Villa Sport Athletic Club San Jose",
    address: "1167 N Capitol Ave, San Jose, CA",
    neighborhood: "San Jose",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/p/AF1QipNj2AxkbO4qQnTzZgnBu1IdQdYPdY6zg2UgNtEd=w408-h272-k-no",
  },
  {
    id: "wagner-ranch-elementary-school-gym",
    name: "Wagner Ranch Elementary School Gym",
    address: "350 Camino Pablo, Orinda, CA",
    neighborhood: "Orinda",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer0rB2U0-wJlDs37adDNpB_v017fsl0vRBWxAxFbJ6rsdg2ZBhlmKLQEMk2k1VsooNK6cSqFxfl3dLahExel44W8MubqecJRh5F9rxpVaefQRPFuIimhKPoIGZm6i8qKXCjQpTe=w800-h600-k-no",
  },
  {
    id: "whisman-sports-center",
    name: "Whisman Sports Center",
    address: "1500 W Middlefield Rd, Mountain View, CA",
    neighborhood: "Mountain View",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepImu-cPD3iihumwo3-rq_Uda2Q7tQwGfyjUrktcVeiSuo-16sNSwcFx8PodQvz706AYpf9cc1gL4CuYe2wzJIpgvxubLd9-zK3GTXCB1amrCRdRCGsWEGg7IElgSYe4B0VY7R0QggorB5V=w408-h544-k-no",
  },
  {
    id: "woodside-elementary-school",
    name: "Woodside Elementary School",
    address: "3195 Woodside Rd, Woodside, CA",
    neighborhood: "Woodside",
    sports: ["basketball"],
    description: "Basketball court available for rental. Contact venue for availability and pricing.",
    priceRange: "",
    phone: "",
    website: "",
    indoor: true,
    courtCount: 1,
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerT4sKDJ4B0XvvwWmWjgVUpRBX3-kPdiOa_KNR1EzKEQT1aYQnYXYwCzAtJ8gNcj2biXFSnbdprWdi9LvEW2Dm6TeAq6jgaEPEHJuvAINPoh8I2EaB7qTrFNI-GDYT_oFVIlIqf=w408-h264-k-no",
  },
];

const useDb = !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY));

interface DbVenue {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  sports: string[];
  description: string;
  price_range: string;
  phone: string;
  website: string;
  indoor: boolean;
  court_count: number;
  image_url: string;
}

function toVenue(row: DbVenue): Venue {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    neighborhood: row.neighborhood,
    sports: row.sports as Sport[],
    description: row.description,
    priceRange: row.price_range,
    phone: row.phone,
    website: row.website,
    indoor: row.indoor,
    courtCount: row.court_count,
    imageUrl: row.image_url || undefined,
  };
}

function toDbRow(venue: Venue) {
  return {
    id: venue.id,
    name: venue.name,
    address: venue.address,
    neighborhood: venue.neighborhood,
    sports: venue.sports,
    description: venue.description,
    price_range: venue.priceRange,
    phone: venue.phone,
    website: venue.website,
    indoor: venue.indoor,
    court_count: venue.courtCount,
    image_url: venue.imageUrl || "",
  };
}

const venueStore = new Map<string, Venue>();
seedVenues.forEach((v) => venueStore.set(v.id, v));

export async function getAllVenues(): Promise<Venue[]> {
  if (useDb) {
    const { data, error } = await supabase.from("venues").select("*").order("name");
    if (error) { console.error("[DB] getAllVenues error:", error); return []; }
    return (data as DbVenue[]).map(toVenue);
  }
  return Array.from(venueStore.values());
}

export const venues = seedVenues;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function addVenue(data: Omit<Venue, "id"> & { id?: string }): Promise<Venue> {
  const id = data.id || slugify(data.name);
  const venue: Venue = { ...data, id };
  if (useDb) {
    const { error } = await supabase.from("venues").upsert(toDbRow(venue));
    if (error) { console.error("[DB] addVenue error:", error); throw error; }
  }
  venueStore.set(id, venue);
  return venue;
}

export async function updateVenue(id: string, data: Partial<Omit<Venue, "id">>): Promise<Venue | null> {
  if (useDb) {
    const { data: rows, error } = await supabase.from("venues").select("*").eq("id", id).limit(1);
    if (error || !rows?.length) return null;
    const existing = toVenue(rows[0] as DbVenue);
    const updated = { ...existing, ...data };
    const { error: upErr } = await supabase.from("venues").update(toDbRow(updated)).eq("id", id);
    if (upErr) { console.error("[DB] updateVenue error:", upErr); return null; }
    venueStore.set(id, updated);
    return updated;
  }
  const existing = venueStore.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...data };
  venueStore.set(id, updated);
  return updated;
}

export async function deleteVenue(id: string): Promise<boolean> {
  if (useDb) {
    const { error } = await supabase.from("venues").delete().eq("id", id);
    if (error) { console.error("[DB] deleteVenue error:", error); return false; }
  }
  return venueStore.delete(id);
}

export function parseVenueCSV(csvText: string): Venue[] {
  const lines = csvText.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const results: Venue[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx]?.trim() || "";
    });

    const name = row["name"] || "";
    if (!name) continue;

    const sportsRaw = (row["sports"] || "").split(";").map((s) => s.trim().toLowerCase()).filter(Boolean);

    const sports: Sport[] =
      sportsRaw.length === 0
        ? ["basketball"]
        : (sportsRaw.filter((s) => VALID_SPORTS.includes(s as Sport)) as Sport[]);

    if (sports.length === 0) continue;

    const venue: Venue = {
      id: row["id"] || slugify(name),
      name,
      address: row["address"] || "",
      neighborhood: row["neighborhood"] || "",
      sports,
      description: row["description"] || "",
      priceRange: row["pricerange"] || row["price_range"] || row["price range"] || "",
      phone: row["phone"] || "",
      website: row["website"] || "",
      indoor: ["true", "yes", "1", "indoor"].includes((row["indoor"] || "false").toLowerCase()),
      courtCount: parseInt(row["courtcount"] || row["court_count"] || row["courts"] || "1", 10) || 1,
    };

    results.push(venue);
  }

  return results;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export async function importVenuesFromCSV(csvText: string): Promise<{ added: number; errors: string[] }> {
  const parsed = parseVenueCSV(csvText);
  const errors: string[] = [];
  let added = 0;

  for (let idx = 0; idx < parsed.length; idx++) {
    try {
      await addVenue(parsed[idx]);
      added++;
    } catch {
      errors.push(`Row ${idx + 2}: Failed to import "${parsed[idx].name}"`);
    }
  }

  return { added, errors };
}

export const sportLabels: Record<string, string> = {
  basketball: "Basketball",
};

export const sportEmoji: Record<string, string> = {
  basketball: "\uD83C\uDFC0",
};

export async function getVenueById(id: string): Promise<Venue | undefined> {
  if (useDb) {
    const { data, error } = await supabase.from("venues").select("*").eq("id", id).limit(1);
    if (error || !data?.length) return undefined;
    return toVenue(data[0] as DbVenue);
  }
  return venueStore.get(id);
}

export async function getVenuesBySport(sport: string): Promise<Venue[]> {
  const all = await getAllVenues();
  if (sport === "all") return all;
  return all.filter((v) => v.sports.includes(sport as Sport));
}

export async function seedDatabase(): Promise<void> {
  if (!useDb) return;
  const { count, error } = await supabase.from("venues").select("*", { count: "exact", head: true });
  if (error) { console.error("[DB] seedDatabase count error:", error); return; }
  if (count && count > 0) return;
  const rows = seedVenues.map(toDbRow);
  const { error: insertErr } = await supabase.from("venues").insert(rows);
  if (insertErr) { console.error("[DB] seedDatabase insert error:", insertErr); return; }
  console.log(`[DB] Seeded ${rows.length} venues`);
}
