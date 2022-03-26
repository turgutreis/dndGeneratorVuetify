<template>
  <v-data-table
    :headers="headers"
    :items="players"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Roll for All</v-toolbar-title>
        <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
        <v-btn
          icon
          fab
          small
          dark
          color="blue"
          class="ml-3"
          @click="rollAllDices"
        >
          <font-awesome-icon color="red" class="fa-4x" icon="dice-d20" />
        </v-btn>
        <v-spacer></v-spacer>
        <!-- FOR PLAYER CHARACTERS -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on">
              Add New Players
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ "Add new Player" }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="playerName"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="iniModifier"
                      label="Ini Modifer"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="addNewPlayer">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- FOR ENEMYS -->
        <v-dialog v-model="dialog2" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" dark class="mb-2 ml-2" v-bind="attrs" v-on="on">
              Add New Enemys
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ "Add new Enemy" }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="enemyName"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="enemyIniModifier"
                      label="Ini Modifer"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="enemyNumbers"
                      label="Number of Enemys"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEnemyDialog">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="addNumberOfEnemys">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete2" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        fab
        icon
        small
        color="red"
        @click="diceGenerator(item.modifier, item.id)"
      >
        <font-awesome-icon class="fa-xl" icon="dice-d20" />
      </v-btn>
      <!-- <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon> -->
      <!-- <v-icon small @click="removePlayer(item)"> {{ item }} </v-icon> -->
      <v-btn fab icon small color="red" @click="removePlayer(item.id)">
        <font-awesome-icon class="fa-xl" icon="fa-solid fa-x" />
      </v-btn>
    </template>
    <template v-slot:no-data>
      <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
    </template>
  </v-data-table>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "HelloWorld",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialog2: false,
    dialogDelete2: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "playername",
      },
      { text: "Ini-Modifer", value: "modifier" },
      { text: "Dice Value", value: "diceVal" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    players: [],
    playerName: null,
    iniModifier: null,
    enemyNumbers: 0,
    enemyName: null,
    enemyIniModifier: 0,
    defaultItem: {
      name: "",
      modifer: 0,
    },
    defaultEnemyItem: {
      enemyName: "",
      enemyIniModifier: 0,
      enemyNumbers: 0,
    },
  }),
  computed: {
    playerItem() {
      return this.players;
    },
  },
  created() {},
  mounted() {
    if (localStorage.getItem("player")) {
      try {
        this.players = JSON.parse(localStorage.getItem("player"));
        console.log(this.players);
      } catch (e) {
        localStorage.removeItem("player");
      }
    }
  },
  methods: {
    addNewPlayer() {
      this.players.push({
        id: nanoid(6),
        playername: this.playerName,
        modifier: this.iniModifier,
        diceVal: 0,
      });
      const parsed = JSON.stringify(this.players);
      localStorage.setItem("player", parsed);
      console.log(this.players);
      this.playerName = "";
      this.iniModifier = "";
    },
    addNumberOfEnemys() {
      for (let i = 0; i < this.enemyNumbers; i++) {
        var index = i + 1;
        this.players.push({
          id: nanoid(6),
          playername: this.enemyName + " " + index,
          modifier: this.enemyIniModifier,
          diceVal: 0,
        });
      }
      const parsed = JSON.stringify(this.players);
      localStorage.setItem("player", parsed);
      console.log(this.players);
      this.enemyName = "";
      this.enemyIniModifier = "";
      this.enemyNumbers = 0;
    },
    diceGenerator(modifier, id) {
      var result = Math.floor(Math.random() * 20) + 1;
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].id === id) {
          this.players[i].diceVal = result + parseInt(modifier);
          const parsed = JSON.stringify(this.players);
          localStorage.setItem("player", parsed);
        }
      }
    },
    sortPlayers() {
      this.players.sort((a, b) => b.diceVal - a.diceVal);
      const value = JSON.parse(localStorage.getItem("player"));
      var newVal = value.sort((a, b) => b.diceVal - a.diceVal);
      const parsed = JSON.stringify(newVal);
      localStorage.setItem("player", parsed);
    },
    rollAllDices() {
      var result = 0;
      for (let i = 0; i < this.players.length; i++) {
        result = Math.floor(Math.random() * 20) + 1;
        this.players[i].diceVal = result + parseInt(this.players[i].modifier);
      }
      const parsed = JSON.stringify(this.players);
      localStorage.setItem("player", parsed);
    },
    removePlayer(val) {
      const index = this.players.map((item) => item.id).indexOf(val);
      this.players.splice(index, 1);
      const parsed = JSON.stringify(this.players);
      localStorage.setItem("player", parsed);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeEnemyDialog() {
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultEnemyItem);
        this.editedIndex = -1;
      });
    },
    closeEnemyDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultEnemyItem);
        this.editedIndex = -1;
      });
    },
    deleteItemConfirm() {
      this.players.splice(this.editedIndex, 1);
      this.closeDelete();
    },
  },
};
</script>
